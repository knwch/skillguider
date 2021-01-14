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
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async createCategory(@Res() res, @Body() categoryData: CreateCategoryDto) {
    const data = await this.categoryService.createCategory(categoryData);
    return res.status(HttpStatus.OK).json({
      message: 'Category has been successfully created',
      data,
    });
  }

  @Get('all')
  async getAllCategories(@Res() res) {
    const data = await this.categoryService.getAllCategories();
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('id')
  async getCategoryById(@Res() res, @Query('id') id: string) {
    const data = await this.categoryService.getCategoryById(id);
    if (!data) throw new NotFoundException('Category does not exist!');
    return res.status(HttpStatus.OK).json(data);
  }

  @Put('update')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Res() res,
    @Query('id') id: string,
    @Body() categoryData: CreateCategoryDto,
  ) {
    const data = await this.categoryService.updateCategory(id, categoryData);
    if (!data) throw new NotFoundException('Category does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Category has been successfully updated',
      data,
    });
  }

  @Delete('delete')
  @UseGuards(AuthGuard())
  async deleteCategory(@Res() res, @Query('id') id: string) {
    const data = await this.categoryService.deleteCategory(id);
    if (!data) throw new NotFoundException('Category does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Category has been deleted',
      data,
    });
  }
}
