import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Skill, SkillDocument } from './schema/skill.schema';
import { JobDocument } from '../job/schema/job.schema';
import { CategoryDocument } from '../category/schema/category.schema';
import { CreateSkillDto } from './dto/create-skill.dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectModel('Skill')
    private readonly SkillModel: Model<SkillDocument>,
    @InjectModel('Job')
    private readonly JobModel: Model<JobDocument>,
    @InjectModel('Category')
    private readonly CategoryModel: Model<CategoryDocument>,
  ) {}

  async createSkill(skillData: CreateSkillDto): Promise<Skill> {
    const createdSkill = new this.SkillModel(skillData);
    return createdSkill.save();
  }

  async getAllSkills(): Promise<any> {
    const skillsData = await this.SkillModel.find();
    return skillsData;
  }

  async getSkillById(id: string): Promise<Skill> {
    const skill = await this.SkillModel.findById(id);
    return skill;
  }

  async updateSkill(id: string, skillData: CreateSkillDto): Promise<Skill> {
    return await this.SkillModel.findByIdAndUpdate(id, skillData, {
      new: true,
    });
  }

  //   async deleteSkill(id: string): Promise<any> {
  //     const skillDeleted = await this.SkillModel.deleteOne({ _id: id });

  //     if (skillDeleted.deletedCount > 0) {
  //       await this.JobModel.deleteMany({
  //         category_id: id,
  //       });
  //     }

  //     return skillDeleted;
  //   }
}
