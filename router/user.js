import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import config from "../config.js";
import { createAirbase, getAirbase, getKeys } from "../db/airtable.js";

const user = new Router();


user.get("/_/me" , async (c)=>{
    const token = await c.state.session.get("token") || (c.request.headers.get("Authorization")?c.request.headers.get("Authorization").replaceAll("Bearer" , "") : undefined);
    const user = await c.state.session.get("user") || c.request.headers.get("x-user");

    if(!token || !user){
        c.response.body = "Invalid Request! No Auth";
        return;
    }

    const airbaseId = await getAirbase(user);

    if(!airbaseId){
        c.response.body = "Airbase 404 does not exists!";
        return;
    }

    c.response.body = JSON.stringify({
        "airbaseId" : airbaseId,
        "userId" : user,
        "keys" : await getKeys(airbaseId),
    } , null , 4);
});

user.get("/_/login" , async (c) => {
    const reqToken = c.request.url.searchParams.get("code");

    if(!reqToken) {
        c.response.redirect(config.GIT_LOGIN);
        return;
    }

    try{
        let res = await fetch(config.GIT_CB(reqToken) , {
            method: "POST",
            headers : {
                accept: 'application/json'
            }
        });
        let data = await res.json();
        const accessToken = data.access_token;

        if(!accessToken){
            c.response.body = "Invalid Auth! Try again";
            return;
        }
        
        res = await fetch(`${config.GH_BASE}/user` , {
            headers: {
                Authorization: 'token ' + accessToken
            }
        });

        data = await res.json();

        let airbaseId = await getAirbase(data.id+"");

        if(!airbaseId){
            airbaseId = await createAirbase(data.id+"" , data.login);
        }

        const token = await bcrypt.hash(`${data.id}_${config.HASH_SECRET}`);

        await c.state.session.set("token" , token);
        await c.state.session.set("user" , data.id+"");
        await c.state.session.set("airbaseId" , airbaseId);

        c.response.redirect("/");

    }catch(_err){
        // err
    }

});

/** Admin Implementation */


user.get("/_/logout" , async (c)=>{
    await c.state.session.deleteSession();
    c.response.redirect('/')
});

export {
    user
}