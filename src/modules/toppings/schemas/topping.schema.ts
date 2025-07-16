import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ToppingDocument = HydratedDocument<Topping>;

@Schema({ timestamps: true })
export class Topping {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true })
  restaurantId: string;
}

export const ToppingSchema = SchemaFactory.createForClass(Topping);
