import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schema/job.schema';
import { CategoryDocument } from '../category/schema/category.schema';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectModel('Job')
    private readonly JobModel: Model<JobDocument>,
    @InjectModel('Category')
    private readonly CategoryModel: Model<CategoryDocument>,
  ) {}

  async createJob(jobData: CreateJobDto): Promise<Job> {
    const createdJob = new this.JobModel(jobData);

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

    return createdJob.save();
  }

  async getAllJobs(): Promise<any> {
    return await this.JobModel.find();
  }

  async getJobById(id: string): Promise<any> {
    const job = await this.JobModel.findById(id);
    return job;
  }
}
