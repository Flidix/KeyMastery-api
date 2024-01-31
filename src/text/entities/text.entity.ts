import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@shared/database/entities/base.entity';
import { UserEntity } from 'src/user/entities/user.entity';

import { databaseTables } from '@shared/database/constants';

@Entity({ name: databaseTables.texts })
export class TextEntity extends BaseEntity {
  @Column('text', { array: true })
  text: string[];

  @ManyToOne(() => UserEntity, (user) => user.currentText)
  user: UserEntity;

  @Column()
  userId: number;
}
