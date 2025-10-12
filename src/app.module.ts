import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/server/auth';

@Module({
  imports: [CommonModule, AuthModule.forRoot({ auth })],
  controllers: [],
  providers: [],
})
export class AppModule {}
