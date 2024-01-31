import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@shared/database/services/database.service';

@Injectable()
export class UserService extends DatabaseService {
  async getUser(userId: number) {
    return this.database.users.findOneOrFail({
      where: { id: userId },
      relations: { currentText: true },
    });
  }
}
