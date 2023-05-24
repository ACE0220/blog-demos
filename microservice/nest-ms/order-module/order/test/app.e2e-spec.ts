import { Test, TestingModule } from '@nestjs/testing';
import { TestAppModule } from './test.app.module';
import { ClientRedis } from '@nestjs/microservices';

describe('Redis Microservice', () => {
  let appModule: TestingModule;
  let redisClient: ClientRedis;
  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();
    redisClient = appModule.get('REDIS_CLIENT');
  });

  it('should return order array and length greater than 0', async () => {
    const adminToken = await redisClient
      .send({ cmd: 'sign_token' }, { payload: { username: 'admin' } })
      .toPromise();

    const result = await redisClient
      .send({ cmd: 'get_orders' }, { token: adminToken })
      .toPromise();
    console.log(result);
    expect(result instanceof Array).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return order array and length is 0', async () => {
    const result = await redisClient
      .send({ cmd: 'get_orders' }, { token: 'fake token' })
      .toPromise();
    console.log(result);
    expect(result instanceof Array).toBe(true);
    expect(result.length).toBe(0);
  });

  afterAll(async () => {
    const redisClient = appModule.get('REDIS_CLIENT');
    await redisClient.close();
  });
});
