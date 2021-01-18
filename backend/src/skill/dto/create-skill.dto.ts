import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  readonly skillset: [];
}
