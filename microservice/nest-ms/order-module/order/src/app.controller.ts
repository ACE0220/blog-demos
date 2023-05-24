import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_orders' })
  get_orders({ token }): Promise<Array<any>> {
    const res = this.appService.getOrders({ token });
    return res;
  }
}
