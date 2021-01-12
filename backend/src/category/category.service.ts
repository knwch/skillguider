import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schema/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly CategoryModel: Model<CategoryDocument>,
  ) {}

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.CategoryModel(categoryData);
    return createdCategory.save();
  }

  async getAllCategories(): Promise<any> {
    return await this.CategoryModel.find().exec();
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.CategoryModel.findById(id).exec();
    return category;
  }

  async updateCategory(
    id: string,
    categoryData: CreateCategoryDto,
  ): Promise<Category> {
    return await this.CategoryModel.findByIdAndUpdate(id, categoryData, {
      new: true,
    });
  }

  async deleteCategory(id: string): Promise<any> {
    return await this.CategoryModel.findByIdAndRemove(id);
  }
}
