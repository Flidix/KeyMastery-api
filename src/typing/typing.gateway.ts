import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { TypingService } from './typing.service';

import { WebSocketAuthGuard } from 'src/auth/guards/socket.auth.guard';

import { SocketCtx } from 'src/auth/decorators/socket-ctx.decorator';

import { TypingDto } from './dto/typing.dto';

@UseGuards(WebSocketAuthGuard)
@WebSocketGateway(3001, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class TypingGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly typingService: TypingService) {}

  @SubscribeMessage('typing')
  onTyping(
    @SocketCtx('userId') userId: number,
    @MessageBody() dto: TypingDto,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.typingService.getTyping(dto, userId, socket, this.server);
  }
}
