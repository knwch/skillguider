import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
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
    if (!data) throw new NotFoundException('Job does not exist!');
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
    const data = await this.jobService.deleteJob(id);
    if (!data || data.deletedCount === 0) {
      throw new NotFoundException('Job does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Job has been deleted',
      statusCode: HttpStatus.OK,
    });
  }
}
