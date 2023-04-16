import "https://deno.land/std@0.183.0/dotenv/load.ts";

export default {
    "API_KEY" : Deno.env.get("API_KEY"),
    "WORKSPACE_KEY" : Deno.env.get("WORKSPACE_KEY"),
    "BASE_URL" : "https://api.airtable.com/v0",
    "CLIENT_ID" : Deno.env.get("CLIENT_ID"),
    "CLIENT_SECRET" : Deno.env.get("CLIENT_SECRET"),
    "GIT_LOGIN" : `https://github.com/login/oauth/authorize?client_id=${Deno.env.get("CLIENT_ID")}`,
    "GIT_CB" : (requestToken => `https://github.com/login/oauth/access_token?client_id=${Deno.env.get("CLIENT_ID")}&client_secret=${Deno.env.get("CLIENT_SECRET")}&code=${requestToken}`),
    "GH_BASE" : "https://api.github.com",
    "HASH_SECRET" : Deno.env.get("HASH_SECRET"),
    "ONLY_SELF_HOSTED" : false,
    "ADMIN_TOKEN" : Deno.env.get("ADMIN_TOKEN"),
}