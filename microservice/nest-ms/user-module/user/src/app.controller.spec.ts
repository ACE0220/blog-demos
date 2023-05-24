import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    const op = {
      payload: {
        username: 'admin',
        psw: 'adminpsw',
      },
    };
    let token;
    it('should return token', () => {
      token = appController.sign_token(op);
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    it('should return token correct', () => {
      const resultWrong = appController.verify_token({
        payload: token + '1',
      });
      const resultCorrect = appController.verify_token({
        payload: token,
      });
      expect(resultWrong.verify).toBe(false);
      expect(resultCorrect.verify).toBe(true);
    });
  });
});
