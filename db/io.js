import config from "../config.js";

const makeOptions = (method , body) => {

    const options = {
        method: method,
        headers: {
            "Authorization" : `Bearer ${config.API_KEY}`,
            "Content-Type" : "application/json",
        },
    };

    if(body){
        options.body = body;
    }

    return options;
}

export {
    makeOptions
}