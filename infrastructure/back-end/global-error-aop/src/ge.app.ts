import Koa, { Context, Next } from 'koa';
import Router from 'koa-router';
import globalException from './global-exception';

const app = new Koa();
const router = new Router();

router.get('/', (ctx: Context) => {
    console.log('get route')
    // 人为制造一场
    throw new Error('人为制造异常')
})

// 任何请求在到达路由之前，都要先经过全局异常捕获工具
app.use(globalException)
app.use(router.routes());

app.listen(3000);
console.log('app running in port 3000')

