import { Context } from "koa";
import Router from "koa-router";

const router = new Router();

router.get("/", async (ctx: Context) => {
  ctx.body = "welcome to index path";
});

export default router;
