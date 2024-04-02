import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { PubchemReq } from '../middlewares/api.middleware';
import { Request } from 'express';

export interface IPubchemAPI extends Request {
  pubchemAPI?: string;
  operation?: string;
}

export const UsePubchemAPI = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    data;
    const request: IPubchemAPI = context.switchToHttp().getRequest();
    const pubchemAPI = request.pubchemAPI;
    const operation = request.operation;
    return { pubchemAPI, operation } as IPubchemAPI;
  },
);
