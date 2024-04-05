import { Injectable } from '@nestjs/common';
import { getResponse } from './pubchem.util';

@Injectable()
export class PubchemService {
  async getByCid(url: string) {
    const response = await getResponse(url);
    const data = await response.json();
    return data;
  }

  async getByCidImage(url: string) {
    const response = await getResponse(url);
    const imageBuffer = await response.arrayBuffer();
    return imageBuffer;
  }
}
