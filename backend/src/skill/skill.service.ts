import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Skill, SkillDocument } from './schema/skill.schema';
import { JobDocument } from '../job/schema/job.schema';
import { CategoryDocument } from '../category/schema/category.schema';
import { CreateSkillDto } from './dto/create-skill.dto';
import * as request from 'request';
import JSSoup from 'jssoup';

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

    if (!skill) {
      throw new NotFoundException('Skill does not exist!');
    }

    return skill;
  }

  async updateSkill(id: string, skillData: CreateSkillDto): Promise<Skill> {
    const updatedSkill = await this.SkillModel.findByIdAndUpdate(
      id,
      skillData,
      {
        new: true,
      },
    );

    if (!updatedSkill) {
      throw new NotFoundException('Skill does not exist!');
    }

    return updatedSkill;
  }

  async deleteSkill(id: string): Promise<any> {
    const skillDeleted = await this.SkillModel.deleteOne({ _id: id });

    if (skillDeleted.deletedCount > 0) {
      const jobs = await this.JobModel.find({
        'skillset.skill_id': id,
      }).select('_id');

      if (jobs?.length) {
        const jobIdArray = jobs.map((job) => {
          return job._id;
        });

        await this.JobModel.updateMany(
          { _id: { $in: jobIdArray } },
          {
            $pull: {
              skillset: { skill_id: id },
            },
          },
        );
      }

      const categories = await this.CategoryModel.find({
        'skillset.skill_id': id,
      }).select('_id');

      if (categories?.length) {
        const categoryIdArray = categories.map((category) => {
          return category._id;
        });

        await this.CategoryModel.updateMany(
          { _id: { $in: categoryIdArray } },
          {
            $pull: {
              skillset: { skill_id: id },
            },
          },
        );
      }
    }

    // remove multiple skill id
    // {$pull: {'skillset': {"skill_id": {$in : [id, id2, id3...]}}}},

    if (!skillDeleted || skillDeleted.deletedCount === 0) {
      throw new NotFoundException('Skill does not exist!');
    }

    return skillDeleted;
  }

  async crawlMediumArticles(): Promise<any> {
    const results = [] as any;

    await request(
      'https://medium.com/search?q=python',
      async (error, response, body) => {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        const bodyData = await body.toString();

        const soup = await new JSSoup(bodyData);

        const result_containers = await soup.findAll(
          'div',
          'postArticle-content',
        );

        await result_containers.forEach((container) => {
          const title = container.find('h3').text;
          const url = container.find('a').attrs.href;
          const img = container.find('img').attrs.src;
          const data = { title: title, url: url, img: img };
          results.push(data);
        });

        return results;
      },
    );
  }
}
