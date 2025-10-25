import {
  AuthGuard,
  Session,
  UserSession,
} from '@thallesp/nestjs-better-auth';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  @Get('session')
  async getSession(@Session() session: UserSession) {
    return session;
  }
}