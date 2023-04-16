
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
                "type": "multilineText"
              },
              {
                "name": "PUBLIC",
                "options": {
                  "color": "greenBright",
                  "icon": "check"
                },
                "type": "checkbox"
              }
            ],
            "name": "Store"
          }
        ],
        "workspaceId": workspaceKey
      }
}
 
export default schema;