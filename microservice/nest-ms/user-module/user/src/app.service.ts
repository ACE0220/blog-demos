import { Injectable } from '@nestjs/common';
import {
  JWTUtils,
  IPublicSignOptions,
  IPublicVerifyRet,
} from '@nestms/tools-jwt';

@Injectable()
export class AppService {
  sign_token(options: IPublicSignOptions): string {
    return JWTUtils.signToken(options);
  }

  verify_token(options: IPublicSignOptions): IPublicVerifyRet {
    const verifyResult = JWTUtils.verifyToken(options);
    return verifyResult;
  }
}
