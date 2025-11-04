import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),

  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),

  UI_URL: z.string(),

  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
});

const skipValidation = process.env.SKIP_ENV_VALIDATION === 'true';

let env: z.infer<typeof envSchema>;

if (skipValidation) {
  console.log('Skipping environment validation for build stage');

  const raw = Object.fromEntries(
    Object.keys(envSchema.shape).map((key) => [key, process.env[key] ?? '']),
  );

  const parsed = envSchema.safeParse(raw);

  env = parsed.success ? parsed.data : envSchema.parse({});
} else {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('Invalid environment variables:');
    console.error(z.treeifyError(parsed.error));
    throw new Error('Invalid environment variables');
  }

  env = parsed.data;
}

export { env };

export type Env = typeof env;
