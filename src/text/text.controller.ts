import { Controller, Post, UseGuards } from '@nestjs/common';

import { TextService } from './text.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

import { CurrentUser } from 'src/auth/decorators/currentUser';

@UseGuards(JwtAuthGuard)
@Controller('text')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Post('update')
  updateText(@CurrentUser('userId') userId: number) {
    return this.textService.updateText(userId);
  }
}
