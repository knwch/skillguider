import { Model } from 'mongoose';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schema/category.schema';
import { JobDocument } from '../job/schema/job.schema';
import { SkillDocument } from '../skill/schema/skill.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly CategoryModel: Model<CategoryDocument>,
    @InjectModel('Job')
    private readonly JobModel: Model<JobDocument>,
    @InjectModel('Skill')
    private readonly SkillModel: Model<SkillDocument>,
  ) {}

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.CategoryModel(categoryData);
    const { skillset } = createdCategory;

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

    return createdCategory.save();
  }

  async getAllCategories(): Promise<any> {
    const categoriesData = await this.CategoryModel.find();
    return categoriesData;
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.CategoryModel.findById(id);

    if (!category) {
      throw new NotFoundException('Category does not exist!');
    }

    return category;
  }

  async updateCategory(
    id: string,
    categoryData: CreateCategoryDto,
  ): Promise<Category> {
    const { skillset } = categoryData;

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

    const updatedCategory = await this.CategoryModel.findByIdAndUpdate(
      id,
      categoryData,
      {
        new: true,
      },
    );

    if (!updatedCategory) {
      throw new NotFoundException('Category does not exist!');
    }

    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<any> {
    const categoryDeleted = await this.CategoryModel.deleteOne({ _id: id });

    if (categoryDeleted.deletedCount > 0) {
      await this.JobModel.deleteMany({
        category_id: id,
      });
    } else if (!categoryDeleted || categoryDeleted.deletedCount === 0) {
      throw new NotFoundException('Category does not exist!');
    }

    return categoryDeleted;
  }
}
