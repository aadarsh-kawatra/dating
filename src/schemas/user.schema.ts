import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

@Schema({
  collection: 'Users',
})
export class UserModel {
  _id: ObjectId;

  @Prop()
  email: string;

  @Prop()
  countryCode: string;

  @Prop()
  phone: number;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  city: string;
}

export type UserDocument = HydratedDocument<UserModel>;

export const UserSchema = SchemaFactory.createForClass(UserModel);
