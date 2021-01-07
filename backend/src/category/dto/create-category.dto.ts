import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @IsOptional()
  @IsMongoId()
  readonly skills_category: string;
}
