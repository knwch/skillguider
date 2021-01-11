import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsMongoId()
  readonly skillset: string;
}
