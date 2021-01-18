import { Module } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { JobModule } from './job/job.module';
import { SkillModule } from './skill/skill.module';

mongoose.set('useFindAndModify', false);

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/skillguider'),
    AuthModule,
    CategoryModule,
    JobModule,
    SkillModule,
  ],
})
export class AppModule {}
