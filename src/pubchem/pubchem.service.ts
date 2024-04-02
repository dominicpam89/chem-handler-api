import { Injectable } from '@nestjs/common';

@Injectable()
export class PubchemService {
  getByCid(cid: string, api: string) {}
  getByName(name: string, api: string) {}
  getBySmiles(smiles: string, api: string) {}
}
