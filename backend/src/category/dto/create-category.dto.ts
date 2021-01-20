import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsMongoId,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CategorySkill {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly skill_id: string;
}

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ type: [CategorySkill] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategorySkill)
  readonly skillset: [CategorySkill];
}
