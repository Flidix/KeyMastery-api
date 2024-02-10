import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { TextModule } from './text/text.module';
import { TypingModule } from './typing/typing.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from '@shared/database/database.module';
import { RecordModule } from './record/record.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, TextModule, TypingModule, RecordModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class RootModule {}
