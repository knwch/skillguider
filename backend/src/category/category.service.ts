import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  private categories: Category[] = [];

  getAllCategories() {
    return this.categories;
  }

  createCategory(title: string, skillset: []) {
    const category: Category = {
      title,
      skillset,
    };

    this.categories.push(category);
    return category;
  }

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
