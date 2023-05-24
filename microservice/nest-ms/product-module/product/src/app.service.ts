import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redisClient: ClientProxy,
  ) {}

  async get_product_list({ token }): Promise<Array<any>> {
    const verify = await this.redisClient
      .send({ cmd: 'verify_token' }, { payload: token })
      .toPromise();
    if (verify.verify && verify.decode.username === 'admin') {
      return [
        {
          product_name: 'product1',
          tag: 'user',
        },
        {
          product_name: 'product2',
          tag: 'user',
        },
      ];
    }
    return [
      {
        product_name: 'product3',
        tag: 'admin',
      },
      {
        product_name: 'product4',
        tag: 'admin',
      },
    ];
  }
}
