import { Test, TestingModule } from '@nestjs/testing';
import { TestAppModule } from './test.app.module';

describe('Redis Microservice', () => {
  let appModule: TestingModule;
  let redisClient: any;
  let token: string;
  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();
    redisClient = appModule.get('REDIS_CLIENT');
  });

  it('should return "token" from Redis microservice"', async () => {
    token = await redisClient
      .send({ cmd: 'sign_token' }, { payload: { username: 'admin' } })
      .toPromise();
    console.log(token);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('verify token', async () => {
    const verify = await redisClient
      .send({ cmd: 'verify_token' }, { payload: token })
      .toPromise();
    expect(verify.verify).toBe(true);
  });

  it('verify uncorrect token', async () => {
    const verify = await redisClient
      .send({ cmd: 'verify_token' }, { payload: token + '1' })
      .toPromise();
    expect(verify.verify).toBe(false);
  });

  afterAll(async () => {
    const redisClient = appModule.get('REDIS_CLIENT');
    await redisClient.close();
  });
});
