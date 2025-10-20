import { type BetterAuthOptions, betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin, openAPI } from 'better-auth/plugins';
import { PrismaService } from 'src/common/prisma.service';

export const auth = betterAuth({
  database: prismaAdapter(PrismaService, {
    provider: 'postgresql',
  }),
  plugins: [openAPI(), admin()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      premium: {
        type: 'boolean',
        input: false,
      },
    },
  },
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
