import Koa from 'koa';
import Router from 'koa-router';
import { dbConfig } from './conf/dbconfig';
const app = new Koa();
const router = new Router();

console.log(dbConfig.getConf('database'))
console.log(dbConfig.getConf('port'))
console.log(dbConfig.getConf())

router.get('/', (ctx: Koa.Context) => {
  ctx.body = 'welcome'
})

app.use(router.routes());

app.listen(3000);

console.log('app is running in port 3000');