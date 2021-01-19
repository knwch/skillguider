import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ _id: false })
class Skill {
  @Prop()
  skill_id: string;

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
  category_id: string;

  @Prop({ type: [SkillSchema], default: [] })
  skillset: Skill[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
