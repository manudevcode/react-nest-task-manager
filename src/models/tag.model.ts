import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TagDocument = Tag & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
})
export class Tag {

  @Prop()
  name: string

  @Prop()
  color: string
}

export const TagSchema = SchemaFactory.createForClass(Tag);