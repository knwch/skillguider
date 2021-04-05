import { Module } from '@nestjs/common';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { JobModule } from './job/job.module';
import { SkillModule } from './skill/skill.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get(
          'CLUSTER_USERNAME',
        )}:${configService.get(
          'CLUSTER_PASSWORD',
        )}@cluster1412.whx5x.mongodb.net/skillguider?retryWrites=true&w=majority`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRoot(
    //   `mongodb+srv://${process.env.CLUSTER_USERNAME}:${process.env.CLUSTER_PASSWORD}@cluster1412.whx5x.mongodb.net/skillguider?retryWrites=true&w=majority`,
    // ),
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
