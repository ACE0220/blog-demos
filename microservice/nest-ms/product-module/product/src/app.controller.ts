import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_product_list' })
  async get_product_list({ token }): Promise<Array<any>> {
    const res = await this.appService.get_product_list({ token });
    return res;
  }
}
