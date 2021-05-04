import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Project } from "./project.model";
import { Tag } from "./tag.model";
import { User } from "./user.model";

export type TaskDocument = Task & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
})
export class Task {

  @Prop()
  name: string

  @Prop()
  description: string

  @Prop()
  dueDate: Date

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  })
  createdBy: User

  @Prop({
    type: Boolean,
    default: false
  })
  finished: boolean

  @Prop()
  color: string

  @Prop({
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }]
  })
  tags: Tag[]

  @Prop({
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  })
  assignedTo: User[]

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  })
  project: Project

  @Prop({
    type: Boolean,
    default: false
  })
  onTrash: boolean

  @Prop({
    default: 0
  })
  commentsCount: number

  @Prop({
    default: 100
  })
  status: number
}

export const TaskSchema = SchemaFactory.createForClass(Task);