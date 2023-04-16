import { Application } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import api from "./router/api.js";
import { user } from "./router/user.js";
import { Session, CookieStore } from "https://deno.land/x/oak_sessions@v4.1.3/mod.ts";

const app = new Application();
const cookie = new CookieStore();
app.use(Session.initMiddleware(cookie));

app.use(user.routes());
app.use(user.allowedMethods());
app.use(api.routes());
app.use(api.allowedMethods());


app.use(async (c)=>{
    c.response.body =`xx${await c.state.session.get("token")}`;
})

await app.listen({port : 3000});