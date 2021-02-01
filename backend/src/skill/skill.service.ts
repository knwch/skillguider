import { Injectable, NotFoundException, HttpService } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Skill, SkillDocument } from './schema/skill.schema';
import { JobDocument } from '../job/schema/job.schema';
import { CategoryDocument } from '../category/schema/category.schema';
import { CreateSkillDto } from './dto/create-skill.dto';
import { SubmitSkillDto } from './dto/submit-skill.dto';
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
    private httpService: HttpService,
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

  async submitSkill(skillData: SubmitSkillDto): Promise<any> {
    const { job_title } = skillData;

    const job = await this.JobModel.findOne({ title: job_title });
    const category = await this.CategoryModel.findOne({ _id: job.category_id });

    const userSkill: any = skillData.skillset;
    const jobSkill: any = job.skillset;
    let categorySkill: any = category.skillset;

    categorySkill = categorySkill.map((skill) => {
      return {
        skill_id: skill.skill_id,
        priority: 'category',
      };
    });

    let matchedSkill: any = categorySkill.concat(jobSkill);

    matchedSkill = matchedSkill.map((skill) => {
      return {
        skill_id: skill.skill_id,
        priority: skill.priority,
        matched: userSkill.includes(skill.skill_id),
      };
    });

    console.log(matchedSkill);
  }

  async crawlMediumArticles(query: string): Promise<any> {
    const results = [] as any;
    const config = {
      headers: {
        Accept: 'text/html',
      },
    };

    const response = await this.httpService
      .get(`https://medium.com/search?q=${query}`, config)
      .toPromise();

    const html = await response.data.toString();

    const soup = await new JSSoup(html);

    const result_containers = await soup.findAll('div', 'postArticle-content');

    await result_containers.forEach((container) => {
      const title = container.find('h3').text;
      const url = container.find('a').attrs.href;
      const img = container.find('img')?.attrs.src;
      const data = { title: title, url: url, img: img };

      results.push(data);
    });

    return results;
  }
}
