import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompoundsModule } from './compounds/compounds.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compound } from './compounds/compounds.entity';
import { PubchemModule } from './pubchem/pubchem.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Compound],
      synchronize: false,
    }),
    CompoundsModule,
    PubchemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
