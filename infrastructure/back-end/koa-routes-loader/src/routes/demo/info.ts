import { Context } from "koa";
import Router from "koa-router";

const router = new Router();

router.prefix('/demo')

router.get("/info", async (ctx: Context) => {
  ctx.body = "welcome to demo/info";
});

router.get("/", async (ctx: Context) => {
  ctx.body = "welcome to demo";
});

export default router;
