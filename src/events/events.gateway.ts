import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(8000)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  client: Record<string, any>;
  constructor() {
    this.client = {};
  }
  @WebSocketServer()
  server: Server;

  public handleConnection(client): void {
    console.log('hi');
    client['id'] = String(Number(new Date()));
    client['nickname'] = '낯선 사람' + String(Number(new Date()));
    this.client[client['id']] = client;
  }

  public handleDisconnect(client): void {
    console.log('bye', client['id']);
    delete this.client[client['id']];
  }

  @SubscribeMessage('events')
  onEvent(client: any, data: any) {
    console.log("받음");
    return { event: 'events', data: 'test' };
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    console.log(payload);
    for (const [key, value] of Object.entries(this.client)) {
      value.send(
        "201호실로 배달하세요."
      );
    }
  }
}