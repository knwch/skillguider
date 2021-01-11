import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schema/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly CategoryModel: Model<CategoryDocument>,
  ) {}

  async getAllCategories(): Promise<any> {
    return await this.CategoryModel.find().exec();
  }

  // getCategoryById(id: string): Category {
  //   return this.categories.find((category) => category.id === id);
  // }

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.CategoryModel(categoryData);
    return createdCategory.save();
  }

  // deleteCategory(id: string) {
  //   this.categories = this.categories.filter((category) => category.id !== id);
  // }

  // constructor(
  //   @InjectModel(Category.name)
  //   private readonly categoryModel: Model<CategoryDocument>,
  // ) {}

  // async create(createCategoryDto: CreateCategoryDto): Promise<any> {
  //   const createdCategory = new this.categoryModel(createCategoryDto);
  //   return createdCategory.save();
  // }

  // async findAll(): Promise<any> {
  //   return await this.categoryModel.find().exec();
  // }

  // async update(id, createCategoryDto: CreateCategoryDto): Promise<any> {
  //   // return await this.categoryModel.findById(id);
  //   const updateCategory = new this.categoryModel(createCategoryDto);
  //   return await this.categoryModel.findByIdAndUpdate(
  //     id,
  //     {
  //       category: updateCategory.category,
  //       skills_category: updateCategory.skills_category,
  //     },
  //     { useFindAndModify: false },
  //   );
  // }

  // return await this.categoryModel.updateOne(id, updateCategory);
}
