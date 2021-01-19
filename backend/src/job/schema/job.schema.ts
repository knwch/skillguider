import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ _id: false })
class Skill {
  @Prop()
  skill_id: Types.ObjectId;

  @Prop()
  priority: string;
}
export const SkillSchema = SchemaFactory.createForClass(Skill);

@Schema()
export class Job {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  category_id: Types.ObjectId;

  @Prop({ type: [SkillSchema], default: [] })
  skillset: Skill[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
