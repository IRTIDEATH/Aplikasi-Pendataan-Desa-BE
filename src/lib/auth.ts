import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin, bearer, openAPI } from 'better-auth/plugins';
import { PrismaService } from 'src/common/prisma.service';
import { env } from 'src/lib/env';

export const auth = betterAuth({
  database: prismaAdapter(new PrismaService(), {
    provider: 'postgresql',
  }),
  plugins: [openAPI(), admin(), bearer()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        input: false,
      },
      premium: {
        type: 'boolean',
        input: false,
      },
    },
  },
  trustedOrigins: [`${env.UI_URL}`],
});
