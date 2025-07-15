import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserType } from 'src/common/enums/auth.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: Object.values(UserType) })
  type: string;

  @Prop()
  restaurantId?: string;

  @Prop({ type: [String], default: [] })
  roles: string[];

  @Prop({ type: Object, default: {} })
  permissions: Record<string, boolean>;
}
export const UserSchema = SchemaFactory.createForClass(User);
