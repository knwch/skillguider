import { Module } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';

mongoose.set('useFindAndModify', false);

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/skillguider'),
    CategoryModule,
  ],
})
export class AppModule {}
