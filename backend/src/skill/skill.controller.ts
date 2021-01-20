import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('skill')
@Controller('skill')
export class SkillController {
  constructor(private skillService: SkillService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new skill' })
  @ApiResponse({
    status: 201,
    description: 'Skill has been successfully created.',
  })
  @Post('create')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async createSkill(@Res() res, @Body() skillData: CreateSkillDto) {
    const data = await this.skillService.createSkill(skillData);
    return res.status(HttpStatus.CREATED).json({
      message: 'Skill has been successfully created',
      statusCode: HttpStatus.CREATED,
      data,
    });
  }

  @ApiOperation({ summary: 'Get all skills' })
  @ApiResponse({
    status: 200,
    description: 'Return all skills.',
  })
  @Get('all')
  async getAllSkills(@Res() res) {
    const data = await this.skillService.getAllSkills();
    return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, data });
  }

  @ApiOperation({ summary: 'Get skill by id' })
  @ApiResponse({
    status: 200,
    description: 'Return skill by id.',
  })
  @ApiResponse({ status: 404, description: 'Skill not found.' })
  @Get('id')
  async getSkillById(@Res() res, @Query('id') id: string) {
    const data = await this.skillService.getSkillById(id);
    return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, data });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update skill' })
  @ApiResponse({
    status: 200,
    description: 'Skill has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Skill not found.' })
  @Put('update')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Res() res,
    @Query('id') id: string,
    @Body() skillData: CreateSkillDto,
  ) {
    const data = await this.skillService.updateSkill(id, skillData);
    return res.status(HttpStatus.OK).json({
      message: 'Skill has been successfully updated',
      statusCode: HttpStatus.OK,
      data,
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete skill' })
  @ApiResponse({
    status: 200,
    description: 'Skill has been deleted.',
  })
  @ApiResponse({ status: 404, description: 'Skill not found.' })
  @Delete('delete')
  @UseGuards(AuthGuard())
  async deleteCategory(@Res() res, @Query('id') id: string) {
    await this.skillService.deleteSkill(id);
    return res.status(HttpStatus.OK).json({
      message: 'Skill has been deleted',
      statusCode: HttpStatus.OK,
    });
  }
}
