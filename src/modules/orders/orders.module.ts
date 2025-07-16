import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { PizzasModule } from '../pizzas/pizzas.module';
import { ToppingsModule } from '../toppings/toppings.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    PizzasModule,
    ToppingsModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
