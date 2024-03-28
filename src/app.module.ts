import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompoundsModule } from './compounds/compounds.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compound } from './compounds/compounds.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Compound, User],
      synchronize: false,
    }),
    CompoundsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
