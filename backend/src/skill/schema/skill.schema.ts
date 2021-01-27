import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SkillDocument = Skill & Document;

@Schema()
export class Skill {
  @Prop()
  title: string;

  @Prop()
  keyword_suffix: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
