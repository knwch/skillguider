import {
  Injectable,
  NotFoundException,
  HttpService,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Skill, SkillDocument } from './schema/skill.schema';
import { JobDocument } from '../job/schema/job.schema';
import { CategoryDocument } from '../category/schema/category.schema';
import { CreateSkillDto } from './dto/create-skill.dto';
import { SubmitSkillDto } from './dto/submit-skill.dto';
import { UDEMY_SECRET } from '../config';
import JSSoup from 'jssoup';
import Fuse from 'fuse.js';

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

  async searchSkills(query: string): Promise<any> {
    const skills = await this.SkillModel.find();

    const fuse = new Fuse(skills, {
      keys: ['title'],
    });

    const results = fuse.search(query).slice(0, 10);

    return results;
  }

  async submitSkill(skillData: SubmitSkillDto): Promise<any> {
    const { job_title, skillset } = skillData;

    if (skillset?.length) {
      const skills = await this.SkillModel.find({
        _id: { $in: skillset },
      });

      if (skillset?.length !== skills.length) {
        const errors = { skillset: 'Some skills do not exist.' };
        throw new HttpException(
          { message: 'Input data validation failed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const job = await this.JobModel.findOne({ title: job_title });

    if (!job) {
      throw new NotFoundException('Job does not exist!');
    }

    const category = await this.CategoryModel.findOne({ _id: job.category_id });

    const userSkill: any = skillset ? skillset : [];
    const jobSkill: any = job.skillset ? job.skillset : [];
    let categorySkill: any = category.skillset ? category.skillset : [];

    categorySkill = categorySkill.map((skill) => {
      return {
        priority: 'Category',
        skill_id: skill.skill_id,
      };
    });

    const mergeSkillArray: any = categorySkill.concat(jobSkill);

    const filterSkillArray = mergeSkillArray
      .filter((skill, index, array) => {
        if (skill.priority === 'Category') {
          // filter it out when the same skill_id is found in the array and the index isn't the same as current item you are looking at
          return !array.some(
            (i, idx) => i.skill_id === skill.skill_id && idx > index,
          );
        }
        return true;
      })
      .sort((curr, next) => (curr.skill_id > next.skill_id ? 1 : -1));

    const filterSkillIds = filterSkillArray.map((skill) => {
      return skill.skill_id;
    });

    const modelSkill = await this.SkillModel.find({
      _id: { $in: filterSkillIds },
    });

    const matchSkillArray = filterSkillArray.map((skill, index) => {
      return {
        skill_id: skill.skill_id,
        title: modelSkill[index].title,
        keyword_suffix: modelSkill[index].keyword_suffix,
        priority: skill.priority,
        matched: userSkill.includes(skill.skill_id),
      };
    });

    return matchSkillArray;
  }

  async getSuggestedArticles(query: string): Promise<any> {
    const articles = await this.crawlMediumArticles(query);
    return articles;
  }

  async getSuggestedCourses(query: string): Promise<any> {
    const courses = await this.fetchUdemyCourses(query);
    return courses;
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
      const title = container.find('h3')
        ? container.find('h3').text
        : container.find('h2')?.text;
      const url = container.find('a')?.attrs.href;
      const img = container.find('img')?.attrs.src;
      const data = { title: title, url: url, img: img };

      if (Object.keys(data).length === 3) {
        results.push(data);
      }
    });

    return results;
  }

  async fetchUdemyCourses(query: string): Promise<any> {
    const results = [] as any;
    const clientId = UDEMY_SECRET.clientId;
    const clientSecret = UDEMY_SECRET.clientSecret;
    const basicAuth =
      'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64');

    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: basicAuth,
      },
    };

    const response = await this.httpService
      .get(
        `https://www.udemy.com/api-2.0/courses?page=1&page_size=5&search=${query}`,
        config,
      )
      .toPromise();

    await response.data.results.forEach((course) => {
      const { title, headline, url, img, price } = course;
      const data = { title, headline, url, img, price };

      if (Object.keys(data).length === 5) {
        results.push(data);
      }
    });

    return results;
  }
}
