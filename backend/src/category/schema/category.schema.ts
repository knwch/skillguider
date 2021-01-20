import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ _id: false })
class CategorySkill {
  @Prop()
  skill_id: string;
}
export const CategorySkillSchema = SchemaFactory.createForClass(CategorySkill);

@Schema()
export class Category {
  @Prop()
  title: string;

  @Prop({ type: [CategorySkillSchema], default: [] })
  skillset: CategorySkill[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
