import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@shared/database/entities/base.entity';
import { TextEntity } from 'src/text/entities/text.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.records })
export class RecordEntity extends BaseEntity {
  @Column()
  WPM: number;

  @Column()
  userId: number;

  @Column()
  textId: number;

  @ManyToOne(() => TextEntity)
  text: TextEntity;

  @ManyToOne(() => UserEntity, (user) => user.record)
  user: UserEntity;
}
