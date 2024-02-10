import { Injectable } from '@nestjs/common';

import { MoreThan } from 'typeorm';

import { DatabaseService } from '@shared/database/services/database.service';

import { CreateRecordDto } from './dtos/create-record.dto';

@Injectable()
export class RecordService extends DatabaseService {
  async createRecord(userId: number, dto: CreateRecordDto) {
    const checkRecord = await this.database.records.findAll({
      where: { userId, WPM: MoreThan(dto.WPM) },
    });
    console.log(checkRecord);

    if (checkRecord.length !== 0) return false;
    const record = await this.database.records.create({ userId, WPM: dto.WPM, textId: dto.textId });
    return record;
  }
}
