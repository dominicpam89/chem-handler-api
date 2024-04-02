import { Module } from '@nestjs/common';
import { PubchemService } from './pubchem.service';
import { PubchemController } from './pubchem.controller';

@Module({
  providers: [PubchemService],
  controllers: [PubchemController]
})
export class PubchemModule {}
