import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { isVerified } from "../utils/utils.js";

const admin = new Router();


admin.use(async (c , next)=>{
    c.state.token = await c.state.session.get("token") || (c.request.headers.get("Authorization")?c.request.headers.get("Authorization").replace("Bearer" , "").trim() : undefined);
    await next();
});

admin.get("/_/create" , async (c)=>{
    
    const verified = await isVerified("admin" , c.state.token);

    if(!verified){
        c.response.body = "Route only for admin!";
        return;
    }
    
    const airbase = c.request.url.searchParams.get("airbase");
    
    if(!airbase) {
        c.response.body = "No Airbase was specified as Query";
        return;
    }

    let airbaseId = await getAirbase(data.id+"");

    if(!airbaseId){
        airbaseId = await createAirbase(data.id+"" , data.login);
    }

    c.response.body = `Airbase Created : ${airbaseId}`;
});


// Delete from Airbase UI HeHe!

export {
    admin
}