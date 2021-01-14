import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { CreateJobDto } from './dto/create-job.dto';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async createCategory(@Res() res, @Body() jobData: CreateJobDto) {
    const data = await this.jobService.createJob(jobData);
    return res.status(HttpStatus.OK).json({
      message: 'Job has been successfully created',
      data,
    });
  }

  @Get('all')
  async getAllJobs(@Res() res) {
    const data = await this.jobService.getAllJobs();
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('id')
  async getCategoryById(@Res() res, @Query('id') id: string) {
    const data = await this.jobService.getJobById(id);
    if (!data) throw new NotFoundException('Job does not exist!');
    return res.status(HttpStatus.OK).json(data);
  }
}
