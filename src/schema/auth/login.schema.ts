import z from 'zod';

const loginPayloadSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const loginDataSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
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

const loginResponseSchema = baseResponseSchema(loginDataSchema);

export type loginResponseT = z.infer<typeof loginResponseSchema>;
export type loginDataT = z.infer<typeof loginDataSchema>;
export type loginPayloadT = z.infer<typeof loginPayloadSchema>;

export { loginResponseSchema, loginDataSchema, loginPayloadSchema };
