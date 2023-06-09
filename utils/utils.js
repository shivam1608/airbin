import config from "../config.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

const textOrJSON = (value) => {
    try{
        return {s:true , v:JSON.parse(value)};
    }catch(_err){
        return {s:false , v:value};
    }
}


const isVerified = (airbase , token) => {
    if(token === config.ADMIN_TOKEN){
        return true;
    }
    return bcrypt.compareSync(`${airbase}_${config.HASH_SECRET}` , token);
}

export {
    textOrJSON,
    isVerified
}