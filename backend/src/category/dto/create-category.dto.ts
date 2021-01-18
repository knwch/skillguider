import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsMongoId,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';

class Skill {
  @IsMongoId()
  readonly skill_id: Types.ObjectId;
}

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Skill)
  readonly skillset!: [Skill];
}
