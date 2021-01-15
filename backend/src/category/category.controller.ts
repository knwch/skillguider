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

import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({
    status: 201,
    description: 'Category has been successfully created.',
  })
  @Post('create')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async createCategory(@Res() res, @Body() categoryData: CreateCategoryDto) {
    const data = await this.categoryService.createCategory(categoryData);
    return res.status(HttpStatus.CREATED).json({
      message: 'Category has been successfully created',
      statusCode: HttpStatus.CREATED,
      data,
    });
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'Return all categories.',
  })
  @Get('all')
  async getAllCategories(@Res() res) {
    const data = await this.categoryService.getAllCategories();
    return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, data });
  }

  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({
    status: 200,
    description: 'Return category by id.',
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @Get('id')
  async getCategoryById(@Res() res, @Query('id') id: string) {
    const data = await this.categoryService.getCategoryById(id);
    if (!data) throw new NotFoundException('Category does not exist!');
    return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, data });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({
    status: 200,
    description: 'Category has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
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
      statusCode: HttpStatus.OK,
      data,
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({
    status: 200,
    description: 'Category has been deleted.',
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @Delete('delete')
  @UseGuards(AuthGuard())
  async deleteCategory(@Res() res, @Query('id') id: string) {
    const data = await this.categoryService.deleteCategory(id);
    if (!data || data.deletedCount === 0) {
      throw new NotFoundException('Category does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Category has been deleted',
      statusCode: HttpStatus.OK,
    });
  }
}
