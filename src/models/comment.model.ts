import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Task } from "./task.model";
import * as mongoose from 'mongoose';
import { User } from "./user.model";

export type CommentDocument = Comment & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
})
export class Comment {

  @Prop()
  comment: string

  @Prop({
    default: 0
  })
  likes: number

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  })
  task: Task

  @Prop({
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  })
  mentions: User[]
}

export const CommentSchema = SchemaFactory.createForClass(Comment);