import { Application } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import api from "./router/api.js";

const app = new Application();

app.use(api.routes());
app.use(api.allowedMethods());

await app.listen({port : 3000});