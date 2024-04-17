import { Module } from '@nestjs/common';
import { CompoundsService } from './compounds.service';
import { CompoundsController } from './compounds.controller';
import { CompoundsRepository } from './compounds.repository';

@Module({
  providers: [CompoundsService, CompoundsRepository],
  controllers: [CompoundsController],
})
export class CompoundsModule {}
