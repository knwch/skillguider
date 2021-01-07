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
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.schema';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // @Post()
  // @UsePipes(ValidationPipe)
  // async create(@Body() createCategoryDto: CreateCategoryDto) {
  //   await this.categoryService.create(createCategoryDto);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Res() res,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const lists = await this.categoryService.create(createCategoryDto);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been created successfully',
      lists,
    });
  }

  @Get()
  async findAll(@Res() res) {
    const lists = await this.categoryService.findAll();
    return res.status(HttpStatus.OK).json(lists);
  }

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

  @Put()
  async updateCategory(
    @Res() res,
    @Query('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    const lists = await this.categoryService.update(id, updateCategoryDto);
    if (!lists) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      lists,
    });
  }
}
