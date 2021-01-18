import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  category_id: Types.ObjectId;

  @Prop()
  skillset: [{ skill_id: Types.ObjectId; priority: string }];
}

export const JobSchema = SchemaFactory.createForClass(Job);
