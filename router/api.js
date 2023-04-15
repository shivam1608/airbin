import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { deleteValue, forcePutValue, getAirbase, getValue } from "../db/airtable.js";
import { textOrJSON } from "../utils/utils.js";

const api = new Router();


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
    
    let value = await c.request.body().value;
    try{
        value = JSON.stringify(value);
    }catch(_err){
        // Error
    }

    const result = await forcePutValue(id , key , value);
    c.response.body = result?true:false;
});

api.delete("/:airbase/:key" , async (c)=>{
    const airbase = c.params.airbase;
    const key = c.params.key;

    const id = await getAirbase(airbase);
    if(id === null){
        c.response.body = {message:"Invalid Airbase Id" , success : false};
        return;
    }

    c.response.body = {success : await deleteValue(id , key)};
});



export default api;