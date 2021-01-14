import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';
import { Category } from '../../category/schema/category.schema';

export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'Category' })
  category_id: Category;

  @Prop()
  skillset: [];
}

export const JobSchema = SchemaFactory.createForClass(Job);
