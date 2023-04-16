import config from "../config.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const textOrJSON = (value) => {
    try{
        return {s:true , v:JSON.parse(value)};
    }catch(_err){
        return {s:false , v:value};
    }
}


const isVerified = async (airbase , token) => {
    if(token === config.ADMIN_TOKEN){
        return true;
    }
    return await bcrypt.compare(`${airbase}_${config.HASH_SECRET}` , token);
}

export {
    textOrJSON,
    isVerified
}