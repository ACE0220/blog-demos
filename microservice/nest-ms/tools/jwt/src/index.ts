import jwt, { SignOptions, JwtPayload, Secret } from 'jsonwebtoken';

// 以下信息正常下应该通过env去获取
const mockDefaultSignOptions: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1h',
};
const mockSecretKey = 'slsjslkdjg';

export type IPublicVerifyRet = {
  verify: boolean;
  error?: any;
  decode?: string | JwtPayload;
};

/**
 * payload: 负载
 * secretKey: 密钥
 * signOptions: 基本配置
 */
export type IPublicSignOptions = {
  payload: any;
  secretKey?: Secret;
  signOptions?: SignOptions;
};

class JWTUtils {
  static signToken(options: IPublicSignOptions): string {
    let { payload, secretKey, signOptions } = options;
    secretKey = secretKey || mockSecretKey;
    signOptions = signOptions || mockDefaultSignOptions;
    return jwt.sign(payload, secretKey, signOptions);
  }

  static verifyToken(verifyOptions: IPublicSignOptions): IPublicVerifyRet {
    let { payload: token, secretKey, signOptions } = verifyOptions;
    signOptions = signOptions || mockDefaultSignOptions;
    secretKey = secretKey || mockSecretKey;
    const ret: IPublicVerifyRet = {} as IPublicVerifyRet;
    jwt.verify(token, secretKey, signOptions, (err, decode) => {
      if (err) {
        ret.verify = false;
        ret.error = err;
      } else {
        ret.verify = true;
        if (decode) {
          ret.decode = decode;
        }
      }
    });
    return ret;
  }
}

export { JWTUtils };
