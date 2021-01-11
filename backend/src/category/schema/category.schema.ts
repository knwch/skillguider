import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  category_id: string;

  @Prop()
  title: string;

  @Prop()
  skillset: [];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
