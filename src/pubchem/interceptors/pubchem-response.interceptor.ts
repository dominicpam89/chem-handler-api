import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FullRecordsData } from './../types/full-record.type';
import { PropertyData, TProperties } from './../types/property.type';
import { SynonymData } from './../types/synonym.type';
import { FullRecordsDtoMake } from '../dtos/full-record.dto';

type TypeData = FullRecordsData | PropertyData | SynonymData;

// Don't change it, it's coming from PubChem
const EnumData = {
  fullRecords: 'PC_Compounds',
  property: 'PropertyTable',
  synonym: 'Information',
};
const getDataType = (data: TypeData): string => {
  if (Object.keys(data).includes(EnumData.fullRecords))
    return EnumData.fullRecords;
  if (Object.keys(data).includes(EnumData.property)) return EnumData.property;
  if (Object.keys(data).includes(EnumData.synonym)) return EnumData.synonym;
  else return String('Interceptor error, data is unknown!');
};

export class PubchemResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    context;
    return next.handle().pipe(
      map((data: TypeData) => {
        let transformedData: any;
        switch (getDataType(data)) {
          // incase data type is full records
          case EnumData.fullRecords:
            const compounds = data as FullRecordsData;
            transformedData = FullRecordsDtoMake(compounds);
            break;
          // incase data type is based on propertiesTable operation
          case EnumData.property:
            const {
              PropertyTable: { Properties },
            } = data as PropertyData;
            transformedData = this.interceptProperties(Properties);
          // incase data type is based on synonyms operation
          case EnumData.synonym:
            // temporary, need to update
            transformedData = data;
            break;
        }
        return transformedData;
      }),
    );
  }
  interceptProperties(properties: TProperties[]) {
    // temporary
    return properties;
    /** 
      function to make clear output type and data based on
      one cid request, and one property request
     */
    /** 
      function to make clear output type and data based on
      one cid request, and multiple properties request
     */
    /** 
      function to make clear output type and data based on
      multiple cid request, and one property request
     */
    /** 
      function to make clear output type and data based on
      multiple cid request, and multiple properties request
     */
  }
}
