import Koa from 'koa';

export default async function globalException(ctx: Koa.Context, next: Koa.Next) {
  
  try {
    console.log('global exception start');
    await next();
    console.log('global exception end');
  } catch(err: any) {
    const errResult = err as { message: string };
    console.log('global exception capture');
    ctx.body = `Server error: ${ errResult.message }`;
  }
}
