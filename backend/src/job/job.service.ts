import { Model } from 'mongoose';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schema/job.schema';
import { CategoryDocument } from '../category/schema/category.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { SkillDocument } from 'src/skill/schema/skill.schema';
import Fuse from 'fuse.js';

@Injectable()
export class JobService {
  constructor(
    @InjectModel('Job')
    private readonly JobModel: Model<JobDocument>,
    @InjectModel('Category')
    private readonly CategoryModel: Model<CategoryDocument>,
    @InjectModel('Skill')
    private readonly SkillModel: Model<SkillDocument>,
  ) {}

  async createJob(jobData: CreateJobDto): Promise<Job> {
    const createdJob = new this.JobModel(jobData);
    const { skillset } = createdJob;

    const category = await this.CategoryModel.findOne({
      _id: createdJob.category_id,
    });

    if (!category) {
      const errors = { category_id: 'Category does not exist.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (skillset?.length) {
      // convert skill_id from object to string array
      const convertedSkillIds = skillset.map((skill) => {
        return skill.skill_id;
      });

      const skills = await this.SkillModel.find({
        _id: { $in: convertedSkillIds },
      });

      if (skillset?.length !== skills.length) {
        const errors = { skillset: 'Some skills do not exist.' };
        throw new HttpException(
          { message: 'Input data validation failed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return createdJob.save();
  }

  async getAllJobs(): Promise<any> {
    const jobsData = await this.JobModel.find();
    return jobsData;
  }

  async getJobById(id: string): Promise<Job> {
    const job = await this.JobModel.findById(id);

    if (!job) {
      throw new NotFoundException('Job does not exist!');
    }

    return job;
  }

  async getJobsByCategory(category_id: string): Promise<any> {
    const category = await this.CategoryModel.findById(category_id);

    if (!category) {
      throw new NotFoundException('Category does not exist!');
    }

    const jobs = await this.JobModel.find({ category_id: category_id });

    return jobs;
  }

  async updateJob(id: string, jobData: CreateJobDto): Promise<Job> {
    const { skillset } = jobData;

    if (skillset?.length) {
      const convertedSkillIds = skillset.map((skill) => {
        return skill.skill_id;
      });

      const skills = await this.SkillModel.find({
        _id: { $in: convertedSkillIds },
      });

      if (skillset?.length !== skills.length) {
        const errors = { skillset: 'Some skills do not exist.' };
        throw new HttpException(
          { message: 'Input data validation failed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const updatedJob = await this.JobModel.findByIdAndUpdate(id, jobData, {
      new: true,
    });

    if (!updatedJob) {
      throw new NotFoundException('Job does not exist!');
    }

    return updatedJob;
  }

  async deleteJob(id: string): Promise<any> {
    const jobDeleted = await this.JobModel.deleteOne({ _id: id });

    if (!jobDeleted || jobDeleted.deletedCount === 0) {
      throw new NotFoundException('Job does not exist!');
    }

    return jobDeleted;
  }

  async searchJobs(term: string): Promise<any> {
    const jobs = await this.JobModel.find();

    const fuse = new Fuse(jobs, {
      keys: ['title'],
    });

    const results = fuse.search(term).slice(0, 10);

    return results;
  }
}
