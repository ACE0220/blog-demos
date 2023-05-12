import Koa, { Context, Next } from 'koa';
import Router from 'koa-router';


const app = new Koa();
const router = new Router();

router.get('/', (ctx: Context) => {
    console.log('get route')
    ctx.body = 'welcome'
})

const middleware1 = async (ctx: Context, next: Next) => {
  console.log('mw1 start');
  await next();
  console.log('mw1 end');
}

const middleware2 = async (ctx: Context, next: Next) => {
  console.log('mw2 start');
  await next();
  console.log('mw2 end');
}

app.use(middleware1);
app.use(middleware2);
app.use(router.routes());

app.listen(3000);
console.log('app running in port 3000')

