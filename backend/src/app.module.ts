import { Module } from '@nestjs/common';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { JobModule } from './job/job.module';
import { SkillModule } from './skill/skill.module';
import { CLUSTER_SECRET } from './config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/skillguider'),
    MongooseModule.forRoot(
      `mongodb+srv://${CLUSTER_SECRET?.username}:${CLUSTER_SECRET?.password}@cluster1412.whx5x.mongodb.net/skillguider?retryWrites=true&w=majority`,
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front'),
    }),
    AuthModule,
    CategoryModule,
    JobModule,
    SkillModule,
  ],
})
export class AppModule {}
