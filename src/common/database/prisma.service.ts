import { PrismaClient, Prisma } from '@prisma/client';
import { Logger } from 'winston';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, string>
  implements OnModuleInit
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger?: Logger,
  ) {
    super({
      log: [
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  async onModuleInit() {
    if (this.logger) {
      const logger = this.logger;
      this.$on('info', (e) => {
        logger.info(e);
      });
      this.$on('warn', (e) => {
        logger.warn(e);
      });
      this.$on('error', (e) => {
        logger.error(e);
      });
      this.$on('query', (e) => {
        logger.info(e);
      });
    }
    await this.$connect();
  }
}
