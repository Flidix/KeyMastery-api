import { Controller, Get, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

import { CurrentUser } from 'src/auth/decorators/currentUser';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@CurrentUser('userId') userId: number) {
    return this.userService.getUser(userId);
  }
}
