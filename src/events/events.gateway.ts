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

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    for (const [key, value] of Object.entries(this.client)) {
      value.send(
        JSON.stringify({
          event: 'events',
          data: { nickname: client['nickname'], message: payload },
        }),
      );
    }
  }
}

// import { Logger } from '@nestjs/common';
// import {
//   ConnectedSocket,
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   OnGatewayInit,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Namespace, Socket } from 'socket.io';

// @WebSocketGateway(8000, {
//   // transports: ['polling'],
//   namespace: 'chat',
//   cors: {
//     origin: '*',
//   },
// })
// export class EventsGateway
//   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
// {
//   private logger = new Logger('Gateway');

//   @WebSocketServer() nsp: Namespace;

//   // 초기화 이후에 실행
//   afterInit() {
//     this.nsp.adapter.on('create-room', (room) => {
//       this.logger.log(`"Room:${room}" 이 생성되었습니다.`);
//     });

//     this.nsp.adapter.on('join-room', (room, id) => {
//       this.logger.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
//     });

//     this.nsp.adapter.on('leave-room', (room, id) => {
//       this.logger.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
//     });

//     this.nsp.adapter.on('delete-room', (roomName) => {
//       this.logger.log(`"Room:${roomName}"이 삭제되었습니다.`);
//     });

//     this.logger.log('웹소켓 서버 초기화 ✅');
//   }

//   // 소켓이 연결되면 실행
//   handleConnection(@ConnectedSocket() socket: Socket) {
//     this.logger.log(`${socket.id} 소켓 연결`);

//     socket.broadcast.emit('message', {
//       message: `${socket.id}가 들어왔습니다.`,
//     });
//   }

//   // 소켓 연결이 끊기면 실행
//   handleDisconnect(@ConnectedSocket() socket: Socket) {
//     this.logger.log(`${socket.id} 소켓 연결 해제`);
//   }

//   @SubscribeMessage('message')
//   handleMessage(
//     @ConnectedSocket() socket: Socket,
//     @MessageBody() message: string,
//   ) {
//     this.logger.log(`받은 메시지: ${message}`);
//     socket.broadcast.emit('message', { username: socket.id, message });
//     return { username: socket.id, message };
//   }
// }
