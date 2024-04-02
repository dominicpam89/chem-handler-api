import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export interface PubchemReq extends Request {
  pubchemAPI: string;
}

@Injectable()
export class ApiMiddleware implements NestMiddleware {
  use(req: PubchemReq, res: Response, next: (error?: any) => void) {
    const url = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound';
    req.pubchemAPI = url;
    res;
    next();
  }
}
