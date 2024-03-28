import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompoundsModule } from './compounds/compounds.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compounds } from './compounds/compounds.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Compounds],
      synchronize: false,
    }),
    CompoundsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
