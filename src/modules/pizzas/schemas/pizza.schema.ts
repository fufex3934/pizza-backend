import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PizzaDocument = HydratedDocument<Pizza>;

@Schema({ timestamps: true })
export class Pizza {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  basePrice: number;

  @Prop({ required: true })
  restaurantId: string;

  @Prop({ type: [String], default: [] })
  defaultToppingIds: string[];

  @Prop()
  image?: string;
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);
