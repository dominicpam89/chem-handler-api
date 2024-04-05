export type TProperties = {
  CID: number;
  [key: string]: any;
};

export type TPropertiesTable = {
  Properties: TProperties[];
};

export type PropertyData = {
  PropertyTable: TPropertiesTable;
};
