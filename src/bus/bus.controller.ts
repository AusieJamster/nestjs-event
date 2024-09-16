import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge';

export class OrderCreateEvent {
  constructor(private readonly data: { orderId: number; payload: any }) {}
}

@Controller('bus')
export class BusController {
  constructor(private eventEmitter: EventEmitter2) {}

  start: Date;

  @Get('trigger')
  async getTrigger(@Body() payload) {
    const start = new Date();
    await fetch(
      'https://azv4ajhna4.execute-api.ap-southeast-2.amazonaws.com/send',
      {
        method: 'GET',
      },
    );
    const end = new Date();
    console.log('---TOTAL MS---', end.getTime() - start.getTime() + 'ms');
    console.log('#####################');
    return { hello: 'world nice' };
  }

  @Post('test')
  getTest(@Body() payload) {
    console.log('test');
    return { hello: 'world nice' };
  }

  @Post('on')
  getHello(@Body() payload) {
    const end = new Date();
    console.log('<--------', end.toISOString());
    console.log('---TOTAL MS---', end.getTime() - this.start.getTime() + 'ms');
    console.log('#####################');
    return { hello: 'world nice' };
  }

  // {
  //   "detail-type": ["user.signin.v1"]
  // }

  @Get('on')
  async makeExample() {
    const client = new EventBridgeClient({ region: 'ap-southeast-2' });
    this.start = new Date();
    console.log('-------->', this.start.toISOString());
    const result = await client.send(
      new PutEventsCommand({
        Entries: [
          {
            Time: new Date(),
            EventBusName: 'default',
            Source: 'api.tutelage.au',
            DetailType: 'user.signin.v1',
            Resources: [],
            Detail: JSON.stringify({
              action: 'something ',
            }),
          },
        ],
      }),
    );
    const sent = new Date();
    console.log('--SENDING DATE--->', sent.toISOString());
    console.log(
      '--SENDING MS-->',
      sent.getTime() - this.start.getTime() + 'ms',
    );
    console.log('^^^^^^^^^^^^');
    return result;
  }
}
