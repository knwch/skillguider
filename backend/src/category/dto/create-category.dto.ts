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
  readonly skill_id: string;
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
