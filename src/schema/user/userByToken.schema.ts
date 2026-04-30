import { z } from 'zod';

const userByTokenDataSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.email(),
  fullName: z.string(),
  profilePicture: z.string().nullable(),
  timezone: z.string(),
  preferences: z.record(z.string(), z.unknown()),
  isActive: z.boolean(),
  emailVerified: z.boolean(),
  lastLoginAt: z.string().nullable(),
  status: z.enum(['active', 'inactive', 'suspended']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const baseResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    status: z.boolean(),
    message: z.string(),
    data: schema,
    meta: z.object({
      timestamp: z.string(),
      path: z.string(),
    }),
  });

const userByTokenResponseSchema = baseResponseSchema(userByTokenDataSchema);

export type userByTokenResponseT = z.infer<typeof userByTokenResponseSchema>;
export type userByTokenDataT = z.infer<typeof userByTokenDataSchema>;

export { userByTokenResponseSchema, userByTokenDataSchema };
