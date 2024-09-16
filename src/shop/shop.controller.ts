import { Controller, Get, Post } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { OrderCreateEvent } from 'src/bus/bus.controller';

export class OrderCreatedEvent {
  constructor(private readonly data: { orderId: number; payload: any }) {}
}

@Controller()
export class ShopController {
  constructor(private emitter: EventEmitter2) {}

  @OnEvent('shop.stay.quote.v1')
  handleOrderCreate(payload: OrderCreateEvent) {
    // do some logic
  }
}
