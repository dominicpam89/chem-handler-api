import {
  TypeOperation,
  TypeOperationValidator,
} from './../types/operation.type';
/* 
 "id": 1,
 "operationType": "property",
 "propertyName": "MolecularWeight"
*/

import { ValidateIf, IsString, IsNumber, IsIn } from 'class-validator';

export class CIDDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsIn([...TypeOperationValidator])
  operationType: TypeOperation;

  @ValidateIf((object) => object.operationType === 'property')
  @IsString()
  propertyName?: string;
}
