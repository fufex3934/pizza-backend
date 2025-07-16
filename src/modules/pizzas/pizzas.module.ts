import { Module } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { PizzasController } from './pizzas.controller';

@Module({
  providers: [PizzasService],
  controllers: [PizzasController],
})
export class PizzasModule {}
