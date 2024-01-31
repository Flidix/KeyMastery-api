import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { TextService } from 'src/text/text.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, TextService],
  imports: [],
})
export class AuthModule {}
