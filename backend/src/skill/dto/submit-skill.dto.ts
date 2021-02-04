import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitSkillDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly job_title: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId({ each: true })
  readonly skillset: [string];
}
