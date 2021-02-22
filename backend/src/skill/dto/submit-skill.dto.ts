import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitSkillDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly job_id: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId({ each: true })
  readonly skillset: [string];
}
