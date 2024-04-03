import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FullRecordsData } from './../types/full-record.type';
import { PropertyData } from './../types/property.type';
import { SynonymData } from './../types/synonym.type';
import { FullRecordsDto, FullRecordsDtoMake } from '../dtos/full-record.dto';

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
          case EnumData.fullRecords:
            const compounds = data as FullRecordsData;
            transformedData = FullRecordsDtoMake(compounds);
            break;
          case EnumData.property:
            break;
          case EnumData.synonym:
            break;
        }
        return transformedData;
      }),
    );
  }
}
