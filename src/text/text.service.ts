import { Injectable } from '@nestjs/common';

import * as faker from 'faker';

import { DatabaseService } from '@shared/database/services/database.service';

@Injectable()
export class TextService extends DatabaseService {
  generateRandomText(wordsCount) {
    let randomText = '';

    for (let i = 0; i < wordsCount; i++) {
      randomText += faker.random.word() + ' ';
    }

    return randomText.trim();
  }

  async createText(userId: number) {
    const user = await this.database.users.findOneOrFail({ where: { id: userId } });

    const randomSentence = this.generateRandomText(10).split('');

    const text = await this.database.texts.create({
      userId,
      user,
      text: randomSentence,
    });
    return text;
  }

  async updateText(userId: number) {
    const randomSentence = this.generateRandomText(10).split('');

    await this.database.texts.update({ userId }, { text: randomSentence });
    return true;
  }
}
