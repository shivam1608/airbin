
const schema = (airbaseName , workspaceKey , uid="NA") => {
    return {
        "name": airbaseName,
        "tables": [
          {
            "description": `An account store for ${uid}`,
            "fields": [
              {
                "name": "KEY",
                "type": "singleLineText"
              },
              {
                "name": "VALUE",
                "type": "longText"
              }
            ],
            "name": "Store"
          }
        ],
        "workspaceId": workspaceKey
      }
}
 
export default schema;