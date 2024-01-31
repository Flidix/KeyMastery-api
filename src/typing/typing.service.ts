import { Injectable } from '@nestjs/common';

import { Server, Socket } from 'socket.io';

import { DatabaseService } from '@shared/database/services/database.service';

import { TypingDto } from './dto/typing.dto';

@Injectable()
export class TypingService extends DatabaseService {
  async getTyping(dto: TypingDto, userId: number, socket: Socket, server: Server) {
    const text = await this.database.texts.findOneOrFail({ where: { userId } });
    const currentSymbol = text.text[dto.symbolIndex] === dto.symbol;
    console.log('currentSymbol', { ...dto, currentSymbol });

    server.emit('typing', { ...dto, currentSymbol });
  }
}
