import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { deleteValue, forcePutValue, getAirbase, getValue } from "../db/airtable.js";
import { textOrJSON } from "../utils/utils.js";
import config from "../config.js";

const api = new Router();


api.use(async (c , next)=>{
   
    c.state.token = await c.state.session.get("token") || (c.request.headers.get("Authorization")?c.request.headers.get("Authorization").replace("Bearer" , "").trim() : undefined);
    await next();
});

api.get("/:airbase/:key", async (c)=>{

    const airbase = c.params.airbase;
    const key = c.params.key;

    const id = await getAirbase(airbase);
    if(id === null){
        c.response.body = "null";
        return;
    }

    const data = await getValue(id , key);
    
    if(data === null){
        c.response.body = "null";
        return;
    }

    const isPublic = data.public;

    const verified = await bcrypt.compare(`${airbase}_${config.HASH_SECRET}` , c.state.token);

    if(!isPublic && !verified){
        c.response.body = {message:"Auth Token Invalid!" , success : false}
        return;
    }

    const value = textOrJSON(data.value);

    if(value.s){
        c.response.headers.set("Content-Type", "application/json");
    }

    c.response.body = value.v;

});

api.post("/:airbase/:key" , async (c)=>{
    const airbase = c.params.airbase;
    const key = c.params.key;

    const id = await getAirbase(airbase);
    if(id === null){
        c.response.body = {message:"Invalid Airbase Id" , success : false};
        return;
    }
    

    const verified = await bcrypt.compare(`${airbase}_${config.HASH_SECRET}` , c.state.token);
    if(!verified){
        c.response.body = {message:"Auth Token Invalid!" , success : false}
        return;
    }
    
    let value = await c.request.body().value;

    try{
        value = JSON.stringify(value);
    }catch(_err){
        // Error
    }

    const result = await forcePutValue(id , key , value);
    c.response.body = result?true:false;
});

api.patch("/:airbase/:key" , async (c)=>{
    const airbase = c.params.airbase;
    const key = c.params.key;

    const id = await getAirbase(airbase);
    if(id === null){
        c.response.body = {message:"Invalid Airbase Id" , success : false};
        return;
    }
    

    const verified = await bcrypt.compare(`${airbase}_${config.HASH_SECRET}` , c.state.token);
    if(!verified){
        c.response.body = {message:"Auth Token Invalid!" , success : false}
        return;
    }
    
    const value = await c.request.body().value;

    try{
        const _test = JSON.stringify(value);
    }catch(_err){
        c.response.body = {message:"Invalid Body Supplied! JSON Required" , success : false}
        return;
    }

    
    if(value["public"] === true || value["public"] === false){
        const result = await forcePutValue(id , key , null , value.public , true);
        c.response.body = result?true:false;
        return;
    }

    c.response.body = {message:"Invalid Body Supplied" , success : false};
    
});

api.delete("/:airbase/:key" , async (c)=>{
    const airbase = c.params.airbase;
    const key = c.params.key;

    const id = await getAirbase(airbase);
    if(id === null){
        c.response.body = {message:"Invalid Airbase Id" , success : false};
        return;
    }

    const verified = await bcrypt.compare(`${airbase}_${config.HASH_SECRET}` , c.state.token);
    if(!verified){
        c.response.body = {message:"Auth Token Invalid!" , success : false}
        return;
    }

    c.response.body = {success : await deleteValue(id , key)};
});



export default api;