import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsMongoId,
  IsArray,
  ValidateNested,
} from 'class-validator';

class Skill {
  @IsNotEmpty()
  @IsMongoId()
  readonly skill_id: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  readonly priority: string;
}

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly category_id: Types.ObjectId;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Skill)
  readonly skillset: [Skill];
}
