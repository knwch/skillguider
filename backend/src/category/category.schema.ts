import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  category: string;

  @Prop()
  skills_category: [Types.ObjectId];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
