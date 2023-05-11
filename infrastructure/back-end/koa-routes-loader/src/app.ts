import Koa from 'koa';
import routesLoader from './utils/routes-loader';

async function start() {
  const app = new Koa();
  const router = await routesLoader.init();
  
  app.use(router.routes());
  
  app.listen(3000);
  console.log('app running in port 3000')
}
start();