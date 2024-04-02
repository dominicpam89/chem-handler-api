import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IPubchemnQuery, PubchemQueryDto } from '../dtos/pubchem-operation.dto';
import { plainToClass } from 'class-transformer';

interface QueryRequest extends Request {
  operation?: string;
}

export class QueryInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request: QueryRequest = context.switchToHttp().getRequest();
    const _query: IPubchemnQuery = request.query;
    const query = plainToClass(PubchemQueryDto, _query, {
      excludeExtraneousValues: true,
    });
    request.operation = '';
    if (query.property) request.operation = '/property/' + query.property;
    if (query.image) request.operation = '/PNG';
    if (query.synonyms) request.operation = '/synonyms';
    return next.handle();
  }
}
