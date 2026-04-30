import z from 'zod';

const forgetPasswordPayloadSchema = z.object({
  email: z.email(),
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

const forgetPasswordResponseSchema = baseResponseSchema(z.object(z.any));

export type forgetPasswordPayloadT = z.infer<
  typeof forgetPasswordPayloadSchema
>;
export type forgetPasswordResponseT = z.infer<
  typeof forgetPasswordResponseSchema
>;

export { forgetPasswordPayloadSchema, forgetPasswordResponseSchema };
