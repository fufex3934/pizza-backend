import { Test, TestingModule } from '@nestjs/testing';
import { PizzasController } from './pizzas.controller';

describe('PizzasController', () => {
  let controller: PizzasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PizzasController],
    }).compile();

    controller = module.get<PizzasController>(PizzasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
