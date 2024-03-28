import { Module } from '@nestjs/common';
import { CompoundsService } from './compounds.service';
import { CompoundsController } from './compounds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compounds } from './compounds.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compounds])],
  providers: [CompoundsService],
  controllers: [CompoundsController],
})
export class CompoundsModule {}
