import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategorySchema } from './schema/category.schema';
import { AuthModule } from '../auth/auth.module';
import { JobSchema } from '../job/schema/job.schema';
import { SkillSchema } from '../skill/schema/skill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Category', schema: CategorySchema },
      { name: 'Job', schema: JobSchema },
      { name: 'Skill', schema: SkillSchema },
    ]),
    AuthModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
