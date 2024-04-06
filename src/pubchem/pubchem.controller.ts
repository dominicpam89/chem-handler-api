import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { PubchemService } from './pubchem.service';
import { Response as ERes } from 'express';
import { UsePubchemAPI } from './decorators/api-base.decorator';
import { CIDDto } from './dtos/cid.dto';
import { PubchemResponseInterceptor } from './interceptors/pubchem-response.interceptor';

@Controller('pubchem')
export class PubchemController {
  constructor(private pubchemService: PubchemService) {}

  @UseInterceptors(PubchemResponseInterceptor)
  @Post('/cid')
  async getByCid(@Body() body: CIDDto, @UsePubchemAPI() apiURI: string) {
    const { id, operationType, propertyName } = body;
    // creating url based on BODY
    let url: string = apiURI + 'cid/' + id;
    switch (operationType) {
      case 'fullRecords':
        url += '/JSON';
        break;
      case 'property':
        url += '/property/' + propertyName + '/JSON';
        break;
      case 'synonyms':
        url += '/synonyms/JSON';
        break;
      default:
        throw new BadRequestException('operation undefined');
    }
    // get the response based on Body.operationType
    return this.pubchemService.getByCid(url);
  }

  @Get('/cid/:id/image')
  async getByCidImage(
    @Param('id') cid: string,
    @UsePubchemAPI() apiURI: String,
    @Res() response: ERes,
  ) {
    const url = apiURI + 'cid/' + cid + '/PNG';
    const imageBuffer = await this.pubchemService.getByCidImage(url);
    response.setHeader('Content-Type', 'image/png');
    response.send(Buffer.from(imageBuffer));
  }
}
