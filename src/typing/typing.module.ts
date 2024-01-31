import { Module } from '@nestjs/common';

import { TypingService } from './typing.service';

import { TypingGateway } from './typing.gateway';

@Module({
  providers: [TypingGateway, TypingService],
})
export class TypingModule {}
