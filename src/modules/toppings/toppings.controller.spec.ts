import { Test, TestingModule } from '@nestjs/testing';
import { ToppingsController } from './toppings.controller';

describe('ToppingsController', () => {
  let controller: ToppingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToppingsController],
    }).compile();

    controller = module.get<ToppingsController>(ToppingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
