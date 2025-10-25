import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/server/auth';
import { UserModule } from './users/user.module';

@Module({
  imports: [CommonModule, AuthModule.forRoot({ auth }), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
