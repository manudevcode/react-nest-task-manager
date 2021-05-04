import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true
})
export class User extends Document {

  @Prop()
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop()
  image: string
}

export const UserSchema = SchemaFactory.createForClass(User);