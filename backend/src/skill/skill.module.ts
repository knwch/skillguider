import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { SkillSchema } from './schema/skill.schema';
import { AuthModule } from '../auth/auth.module';
import { CategorySchema } from '../category/schema/category.schema';
import { JobSchema } from '../job/schema/job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Skill', schema: SkillSchema },
      { name: 'Job', schema: JobSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
    AuthModule,
    HttpModule,
  ],
  providers: [SkillService],
  controllers: [SkillController],
})
export class SkillModule {}
