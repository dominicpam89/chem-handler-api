import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { IPubchemnQuery, PubchemQueryDto } from '../dtos/pubchem-operation.dto';
import { plainToClass } from 'class-transformer';

interface QueryRequest extends Request {
  operation?: string;
}

@Injectable()
export class QueryMiddleware implements NestMiddleware {
  use(req: QueryRequest, res: Response, next: (error?: any) => void) {
    const _query: IPubchemnQuery = req.query;
    const query = plainToClass(PubchemQueryDto, _query, {
      excludeExtraneousValues: true,
    });
    req.operation = '';
    if (query.property) req.operation = '/property/' + query.property;
    if (query.image) req.operation = '/PNG';
    if (query.synonyms) req.operation = '/synonyms';
    res;
    next();
  }
}
