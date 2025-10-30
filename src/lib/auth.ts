import { type BetterAuthOptions, betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin, bearer, openAPI } from 'better-auth/plugins';
import { PrismaService } from 'src/common/prisma.service';
import { env } from 'src/lib/env';

export const auth = betterAuth({
  database: prismaAdapter(PrismaService, {
    provider: 'postgresql',
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [openAPI(), admin(), bearer()],
  emailAndPassword: {
    enabled: false,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
      },
      premium: {
        type: 'boolean',
        input: false,
      },
    },
  },
  trustedOrigins: [`${env.UI_URL}`],
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
