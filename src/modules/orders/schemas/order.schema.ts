import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrderStatus } from 'src/common/enums/order.enum';

export type OrderDocument = HydratedDocument<Order>;
@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  restaurantId: string;

  @Prop({ required: true })
  pizzaId: string;

  @Prop({ type: [String], default: [] })
  additionalToppingIds: string[];

  @Prop({ required: true, min: 0 })
  totalPrice: number;

  @Prop({
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.PENDING,
  })
  status: string;

  @Prop({ required: true })
  deliveryAddress: string;

  @Prop({ required: true })
  phoneNumber: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
