import "https://deno.land/std@0.183.0/dotenv/load.ts";

export default {
    "API_KEY" : Deno.env.get("API_KEY"),
    "WORKSPACE_KEY" : Deno.env.get("WORKSPACE_KEY"),
    "BASE_URL" : "https://api.airtable.com/v0",
}