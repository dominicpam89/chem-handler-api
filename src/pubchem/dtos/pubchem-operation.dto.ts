import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { Transform, Expose } from 'class-transformer';

export interface IPubchemnQuery {
  property?: string;
  image?: string;
  synonyms?: string;
}

export class PubchemQueryDto {
  @IsOptional()
  @Expose()
  @IsString()
  property?: string;

  @Transform(({ value }) => {
    if (value == '0') return false;
    else if (value == undefined) return false;
    else return true;
  })
  @IsOptional()
  @Expose()
  @IsBoolean()
  image?: boolean;

  @Transform(({ value }) => {
    if (value == '0') return false;
    else if (value == undefined) return false;
    else return true;
  })
  @IsOptional()
  @Expose()
  @IsBoolean()
  synonyms?: boolean;
}
