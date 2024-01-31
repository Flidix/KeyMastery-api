import { UserEntity } from '../../../user/entities/user.entity';
import { TextEntity } from 'src/text/entities/text.entity';

import { DatabaseRepository } from '../repositories/database.repository';

export type DatabaseEntitiesType = {
  users: UserEntity;
  texts: TextEntity;
};

export type DatabaseRepositories = {
  [table in keyof DatabaseEntitiesType]: DatabaseRepository<DatabaseEntitiesType[table]>;
};
