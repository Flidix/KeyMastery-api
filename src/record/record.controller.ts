import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { RecordService } from './record.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

import { CurrentUser } from 'src/auth/decorators/currentUser';

import { CreateRecordDto } from './dtos/create-record.dto';

@UseGuards(JwtAuthGuard)
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  async createRecord(@CurrentUser('userId') userId: number, @Body() dto: CreateRecordDto) {
    return this.recordService.createRecord(userId, dto);
  }
}
