import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusModule } from './bus/bus.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [BusModule, ShopModule, EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
