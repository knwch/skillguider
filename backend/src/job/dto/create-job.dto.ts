import { IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly category_id: string;

  @IsOptional()
  readonly skillset: [];
}
