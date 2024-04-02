import { Controller, Get, Param } from '@nestjs/common';
import { PubchemService } from './pubchem.service';
import { IPubchemAPI, UsePubchemAPI } from './decorators/url.decorator';

@Controller('pubchem')
export class PubchemController {
  constructor(private pubchemService: PubchemService) {}

  @Get('/cid/:cid')
  getByCid(
    @Param('cid') cid: string,
    @UsePubchemAPI() pubchemAPI: IPubchemAPI,
  ) {
    console.log('cid', cid);
    console.log('pubchemAPI', pubchemAPI);
  }

  @Get('/cid/:cid/operation')
  getByCidWithOperation(
    @Param('cid') cid: string,
    @UsePubchemAPI() pubchemAPI: IPubchemAPI,
  ) {
    console.log('cid', cid);
    console.log('pubchemAPI', pubchemAPI);
  }

  //   @Get('/name/:name/operation')
  //   getByName(
  //     @Param('name') name: string,
  //     @UseOperation() operation: string,
  //     @UsePubchemAPI() pubchemAPI: string,
  //   ) {
  //     return this.pubchemService.getByName(name, query, pubchemAPI);
  //   }

  //   @Get('/smiles/:smiles/operation')
  //   getBySmiles(
  //     @Param('smiles') smiles: string,
  //     @UseOperation() operation: string,
  //     @UsePubchemAPI() pubchemAPI: string,
  //   ) {
  //     return this.pubchemService.getBySmiles(smiles, query, pubchemAPI);
  //   }
}
