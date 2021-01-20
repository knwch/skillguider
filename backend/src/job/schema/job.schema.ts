import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

export enum SkillPriorityEnum {
  Normal = 'Normal',
  High = 'High',
}

@Schema({ _id: false })
class JobSkill {
  @Prop()
  skill_id: string;

  @Prop()
  priority: SkillPriorityEnum;
}
export const JobSkillSchema = SchemaFactory.createForClass(JobSkill);

@Schema()
export class Job {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  category_id: string;

  @Prop({ type: [JobSkillSchema], default: [] })
  skillset: JobSkill[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
