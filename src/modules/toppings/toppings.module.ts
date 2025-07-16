import { Module } from '@nestjs/common';
import { ToppingsService } from './toppings.service';
import { ToppingsController } from './toppings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Topping, ToppingSchema } from './schemas/topping.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Topping.name, schema: ToppingSchema }]),
  ],
  providers: [ToppingsService],
  controllers: [ToppingsController],
  exports: [ToppingsService],
})
export class ToppingsModule {}
