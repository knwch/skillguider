import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsMongoId,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum SkillPriorityEnum {
  Normal = 'Normal',
  High = 'High',
}

class JobSkill {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly skill_id: string;

  @ApiProperty({ enum: SkillPriorityEnum })
  @IsNotEmpty()
  @IsString()
  @IsEnum(SkillPriorityEnum)
  readonly priority: SkillPriorityEnum;
}

export class CreateJobDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly category_id: string;

  @ApiProperty({ type: [JobSkill] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => JobSkill)
  readonly skillset: [JobSkill];
}
