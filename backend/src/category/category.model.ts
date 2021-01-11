import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Category {
  @Prop()
  title: string;

  @Prop()
  skillset: [];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
