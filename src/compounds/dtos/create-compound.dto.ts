import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateCompoundDto {
  @IsNumber()
  pk: number;

  @IsString()
  trivial_name: string;

  @IsString()
  cas_number: string;

  @IsString()
  inci_name: string;

  @IsString()
  smiles: string;

  @IsOptional()
  @IsNumber()
  comedogenicity_class?: number;
}
