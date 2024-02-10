import { UserEntity } from '../../../user/entities/user.entity';
import { RecordEntity } from 'src/record/entities/record.entity';
import { TextEntity } from 'src/text/entities/text.entity';

import { DatabaseRepository } from '../repositories/database.repository';

export type DatabaseEntitiesType = {
  users: UserEntity;
  texts: TextEntity;
  records: RecordEntity;
};

export type DatabaseRepositories = {
  [table in keyof DatabaseEntitiesType]: DatabaseRepository<DatabaseEntitiesType[table]>;
};
