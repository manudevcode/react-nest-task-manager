import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "./user.model";

export type ProjectDocument = Project & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
})
export class Project {

  @Prop()
  name: string

  @Prop()
  description: string

  @Prop()
  color: string

  @Prop({
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  })
  members: User[]
}

export const ProjectSchema = SchemaFactory.createForClass(Project);