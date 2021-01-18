import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  title: string;

  @Prop()
  skillset: [{ skill_id: Types.ObjectId }];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
