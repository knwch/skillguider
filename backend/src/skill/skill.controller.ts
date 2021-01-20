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

@Controller('skill')
export class SkillController {
  constructor(private skillService: SkillService) {}

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

  @Get('all')
  async getAllSkills(@Res() res) {
    const data = await this.skillService.getAllSkills();
    return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, data });
  }

  @Get('id')
  async getSkillById(@Res() res, @Query('id') id: string) {
    const data = await this.skillService.getSkillById(id);
    return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, data });
  }

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
