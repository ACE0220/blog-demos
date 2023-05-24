import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { IPublicSignOptions, IPublicVerifyRet } from '@nestms/tools-jwt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'sign_token' })
  sign_token(options: IPublicSignOptions): string {
    return this.appService.sign_token(options);
  }

  @MessagePattern({ cmd: 'verify_token' })
  verify_token(options: IPublicSignOptions): IPublicVerifyRet {
    return this.appService.verify_token(options);
  }
}
