import config from "../config.js";
import { makeOptions } from "./io.js";
import schema from "./schema.js";

const createAirbase = async (airbaseName , uid) => {
    const res = await fetch(`${config.BASE_URL}/meta/bases` , makeOptions("POST" , JSON.stringify(schema(airbaseName , config.WORKSPACE_KEY , uid))));
    const data = await res.json();
    return data.id;
}

const getAirbase = async (airbase) => {
    const res = await fetch(`${config.BASE_URL}/meta/bases`, makeOptions("GET"));
    const data = await res.json();
    let airbases = data["bases"];
    airbases = airbases.filter((v)=>v.name===airbase);
    return airbases.length === 1 ? airbases[0].id : null;
}

const getKeys = async (airbaseId) => {
    const res = await fetch(`${config.BASE_URL}/${airbaseId}/Store` , makeOptions("GET"));
    const data = await res.json();
    let records = data["records"];
    records = records.map((v)=>{return {"key" : v.fields.KEY , "public" : v.fields.PUBLIC?true:false}});
    return records;
}

const getValue = async (airbaseId , key) => {
    const res = await fetch(`${config.BASE_URL}/${airbaseId}/Store` , makeOptions("GET"));
    const data = await res.json();
    let records = data["records"];
    records = records.filter((v)=>v.fields.KEY === key);
    return records.length === 1 ? {"id": records[0].id , "value" : records[0].fields.VALUE , "public" : records[0].fields.PUBLIC} : null;
}

const putValue = async (airbaseId , key , value , isPublic=false) => {

    const body = {
        "fields": {
            "KEY": key,
            "VALUE": value,
            "PUBLIC" : isPublic
        }
    }

    if(isPublic){
        body["PUBLIC"] = true
    }

    const res = await fetch(`${config.BASE_URL}/${airbaseId}/Store` , makeOptions("POST" , JSON.stringify(body)));
    const data = await res.json();
    return data.id;
}


const forcePutValue = async (airbaseId , key , value , isPublic=false , patch=false) => {
    const v  = await getValue(airbaseId , key);
    if(v === null){
        return putValue(airbaseId , key , value , isPublic);
    }

    let body = {
        "fields": {
            "KEY": key,
            "VALUE": value,
        }
    }

    if(patch){
        body = {
            "fields": {
                "PUBLIC" : isPublic,
            }
        }
    }else{
        if(isPublic){
            body["PUBLIC"] = true
        }
    }

    const res = await fetch(`${config.BASE_URL}/${airbaseId}/Store/${v.id}` , makeOptions("PATCH" , JSON.stringify(body)));
    const data = await res.json();
    return data.id;
}


const deleteValue = async (airbaseId , key) => {
    const v  = await getValue(airbaseId , key);
    if(v === null){
        return false;
    }
    const res = await fetch(`${config.BASE_URL}/${airbaseId}/Store/${v.id}` , makeOptions("DELETE"));
    const data = await res.json();
    return data.deleted;
}

export {
    createAirbase,
    forcePutValue,
    deleteValue,
    getAirbase,
    putValue,
    getValue,
    getKeys,
}