const textOrJSON = (value) => {
    try{
        return {s:true , v:JSON.parse(value)};
    }catch(_err){
        return {s:false , v:value};
    }
}

export {
    textOrJSON
}