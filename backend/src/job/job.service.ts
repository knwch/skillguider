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

  async getJobsByCategory(category_id: string): Promise<any> {
    const jobs = await this.JobModel.find({ category_id: category_id }).select(
      'title description category_id',
    );
    return jobs;
  }

  async updateJob(id: string, jobData: CreateJobDto): Promise<Job> {
    return await this.JobModel.findByIdAndUpdate(id, jobData, {
      new: true,
    });
  }

  async deleteJob(id: string): Promise<any> {
    const jobDeleted = await this.JobModel.deleteOne({ _id: id });
    return jobDeleted;
  }
}
