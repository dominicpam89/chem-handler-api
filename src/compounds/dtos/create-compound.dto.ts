import { IsNumber, IsString, IsOptional, Max, Min } from 'class-validator';

export class CreateCompoundDto {
  @IsOptional()
  @IsString()
  trivial_name?: string;

  @IsOptional()
  @IsString()
  cas_number?: string;

  @IsOptional()
  @IsString()
  inci_name?: string;

  @IsString()
  smiles: string;

  @IsOptional()
  @IsNumber()
  @Max(2)
  @Min(0)
  comedogenicity_class?: number | null;
}
