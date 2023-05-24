import { Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientRedis } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('REDIS_CLIENT')
    private readonly redisClient: ClientRedis,
  ) {}

  /**
   * 登录，如果username是admin和不是admin，在获取商品列表的时候是不同的
   * @param request request.body username, password
   * @returns
   */
  @Post('user/login')
  async login(@Req() request: Request): Promise<string> {
    return await this.redisClient
      .send({ cmd: 'sign_token' }, { payload: request.body })
      .toPromise();
  }

  /**
   * 调用user/login,username如果是admin，商品列表有个tag是user，不是admin，tag是random
   * 只是单纯模拟商品列表在不同用户下的列表是不同的
   * @param request 请求
   * @returns 商品列表
   */
  @Get('product/list')
  async product_list(@Req() request: Request) {
    const token = (request.headers as any).token;
    console.log(token);
    return await this.redisClient
      .send({ cmd: 'get_product_list' }, { token })
      .toPromise();
  }

  /**
   * 调用user/login,username如果是admin，订单列表返回空数组，只有用户是admin才能看到
   * 只是单纯模拟订单列表在不同用户下的列表是不同的
   * @param request 请求
   * @returns 订单列表
   */
  @Get('order/list')
  async order_list(@Req() request: Request) {
    const token = (request.headers as any).token;
    return await this.redisClient
      .send({ cmd: 'get_orders' }, { token })
      .toPromise();
  }
}
