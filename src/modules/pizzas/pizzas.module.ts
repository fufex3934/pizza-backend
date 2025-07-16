import { Module } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { PizzasController } from './pizzas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pizza, PizzaSchema } from './schemas/pizza.schema';
import { ToppingsModule } from '../toppings/toppings.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pizza.name, schema: PizzaSchema }]),
    ToppingsModule,
  ],
  providers: [PizzasService],
  controllers: [PizzasController],
  exports: [PizzasService],
})
export class PizzasModule {}
