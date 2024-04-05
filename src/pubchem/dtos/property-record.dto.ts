import { Expose } from 'class-transformer';

export class PropertyRecordDto {
  constructor(private properties?: string[]) {}
}
