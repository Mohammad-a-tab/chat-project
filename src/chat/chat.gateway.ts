import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private namespaceRooms: Map<string, Set<string>> = new Map();
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
  @SubscribeMessage('createRoom')
  handleCreateRoom(
    client: Socket,
    { namespace, room }: { namespace: string; room: string },
  ) {
    if (!this.namespaceRooms.has(namespace)) {
      this.namespaceRooms.set(namespace, new Set());
    }
    const namespaceSet = this.namespaceRooms.get(namespace);
    if (!namespaceSet.has(room)) {
      namespaceSet.add(room);
      console.log(`Room ${namespace}-${room} created.`);
    } else {
      console.log(`Room ${namespace}-${room} already exists.`);
    }
  }

  @SubscribeMessage('joinRoom')
  handleJoinNamespace(client: Socket, room: string) {
    client.join(room);
    console.log(`Client ${client.id} joined room: ${room}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveNamespace(client: Socket, room: string) {
    client.leave(room);
    console.log(`Client ${client.id} left room: ${room}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, data: any) {
    console.log(data);
    this.server
      .to(`${data.namespace}-${data.room}`)
      .emit('message', data.message);
  }
  // @SubscribeMessage('message')
  // handleMessage(@MessageBody() message: string): void {
  //   this.server.emit('message', message);
  // }
}
