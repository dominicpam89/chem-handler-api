import { FullRecordsData, Compound } from '../types/full-record.type';

interface AnyObject {
  [key: string]: any;
}

export const findValueByKey = (
  obj: AnyObject,
  key: string,
): any | undefined => {
  if (typeof obj !== 'object' || obj === null) return undefined;
  if (key in obj) return obj[key];
  for (const prop in obj) {
    const value = findValueByKey(obj[prop], key);
    if (value !== undefined) return value;
  }
  return undefined;
};

export const FullRecordsDtoMake = (data: FullRecordsData) => {
  const compoundData = data.PC_Compounds[0];
  const pk: number = findValueByKey(data, 'cid');
  const indexProp = compoundData.props.findIndex(
    (prop) => prop.urn.label === 'SMILES',
  );
  const smiles: string = compoundData.props[indexProp]?.value?.sval;
  return {
    pk,
    smiles,
  };
};

import { Expose } from 'class-transformer';
export class FullRecordsDto {
  @Expose()
  pk: number;

  @Expose()
  smiles: string;
}
