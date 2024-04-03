import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PubchemService } from './pubchem.service';
import { PubchemController } from './pubchem.controller';
import { ApiMiddleware } from './middlewares/api.middleware';

@Module({
  providers: [PubchemService],
  controllers: [PubchemController],
})
export class PubchemModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiMiddleware).forRoutes('/pubchem');
  }
}
