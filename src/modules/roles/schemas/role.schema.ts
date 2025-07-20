import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;
@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  restaurantId: string;

  @Prop({ type: Object, default: {} })
  permissions: Record<string, boolean>;

  @Prop({ default: false })
  isDefault: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
