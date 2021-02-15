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
import { CreateJobDto } from './dto/create-job.dto';
import { JobService } from './job.service';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('job')
@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new job' })
  @ApiResponse({
    status: 201,
    description: 'Job has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Some of selected skills do not exist.',
  })
  @Post('create')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async createCategory(@Res() res, @Body() jobData: CreateJobDto) {
    const data = await this.jobService.createJob(jobData);
    return res.status(HttpStatus.OK).json({
      message: 'Job has been successfully created',
      data,
    });
  }

  @ApiOperation({ summary: 'Get all jobs' })
  @ApiResponse({
    status: 200,
    description: 'Return all jobs.',
  })
  @Get('all')
  async getAllJobs(@Res() res) {
    const data = await this.jobService.getAllJobs();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data,
    });
  }

  @ApiOperation({ summary: 'Get job by id' })
  @ApiResponse({
    status: 200,
    description: 'Return job by id.',
  })
  @ApiResponse({ status: 404, description: 'Job not found.' })
  @Get('id')
  async getCategoryById(@Res() res, @Query('id') id: string) {
    const data = await this.jobService.getJobById(id);
    return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, data });
  }

  @ApiOperation({ summary: 'Get all jobs by category' })
  @ApiResponse({
    status: 200,
    description: 'Return all jobs by category id.',
  })
  @Get('all/category')
  async getJobsByCategory(@Res() res, @Query('id') category_id: string) {
    const data = await this.jobService.getJobsByCategory(category_id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data,
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update job' })
  @ApiResponse({
    status: 200,
    description: 'Job has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Some of selected skills do not exist.',
  })
  @ApiResponse({ status: 404, description: 'Job not found.' })
  @Put('update')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async updateJob(
    @Res() res,
    @Query('id') id: string,
    @Body() jobData: CreateJobDto,
  ) {
    const data = await this.jobService.updateJob(id, jobData);
    return res.status(HttpStatus.OK).json({
      message: 'Job has been successfully updated',
      statusCode: HttpStatus.OK,
      data,
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete job' })
  @ApiResponse({
    status: 200,
    description: 'Job has been deleted.',
  })
  @ApiResponse({ status: 404, description: 'Job not found.' })
  @Delete('delete')
  @UseGuards(AuthGuard())
  async deleteJob(@Res() res, @Query('id') id: string) {
    await this.jobService.deleteJob(id);
    return res.status(HttpStatus.OK).json({
      message: 'Job has been deleted',
      statusCode: HttpStatus.OK,
    });
  }

  @ApiOperation({ summary: 'Search jobs by keyword' })
  @ApiResponse({
    status: 200,
    description: 'Return jobs.',
  })
  @Get('search')
  async searchJobs(@Res() res, @Query('title') title: string) {
    const data = await this.jobService.searchJobs(title);
    return res.status(HttpStatus.OK).json({ statusCode: HttpStatus.OK, data });
  }
}
