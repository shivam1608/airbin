import { Application, Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import api from "./router/api.js";
import { user } from "./router/user.js";
import { Session, CookieStore } from "https://deno.land/x/oak_sessions@v4.1.3/mod.ts";

const app = new Application();
const home = new Router();
const cookie = new CookieStore();
app.use(Session.initMiddleware(cookie));


home.get("/" , async (c)=>{
    c.response.body = `Token : ${await c.state.session.get("token")}`;
})

app.use(user.routes());
app.use(user.allowedMethods());
app.use(api.routes());
app.use(api.allowedMethods());
app.use(home.routes());
app.use(home.allowedMethods());


app.use((c)=>{
    c.response.body = "404 | Not Found";
})

await app.listen({port : 3000});