import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UsePipes,
  Res,
  Query,
  NotFoundException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.model';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAllCategories(): Category[] {
    return this.categoryService.getAllCategories();
  }

  @Post()
  createCategory(
    @Body('title') title: string,
    @Body('skillset') skillset: [],
  ): Category {
    return this.categoryService.createCategory(title, skillset);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // async create(@Body() createCategoryDto: CreateCategoryDto) {
  //   await this.categoryService.create(createCategoryDto);
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // async createCategory(
  //   @Res() res,
  //   @Body() createCategoryDto: CreateCategoryDto,
  // ) {
  //   const lists = await this.categoryService.create(createCategoryDto);
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Post has been created successfully',
  //     lists,
  //   });
  // }

  // @Get()
  // async findAll(@Res() res) {
  //   const lists = await this.categoryService.findAll();
  //   return res.status(HttpStatus.OK).json(lists);
  // }

  // @Get()
  // async findAll(): Promise<Category[]> {
  //   return this.categoryService.findAll();
  // }

  // async update(
  //   @Param('id') id: string,
  //   @Body() categoryData: CreateCategoryDto,
  // ) {
  //   return this.categoryService.update(id, categoryData);
  // }

  // @Put()
  // async updateCategory(
  //   @Res() res,
  //   @Query('id') id: string,
  //   @Body() updateCategoryDto: CreateCategoryDto,
  // ) {
  //   const lists = await this.categoryService.update(id, updateCategoryDto);
  //   if (!lists) throw new NotFoundException('Id does not exist!');
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Post has been successfully updated',
  //     lists,
  //   });
  // }
}
