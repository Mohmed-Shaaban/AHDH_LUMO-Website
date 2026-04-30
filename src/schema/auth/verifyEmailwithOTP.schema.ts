import z from 'zod';

const verifyEmailwithOTPPayloadSchema = z.object({
  email: z.email(),
  otp: z.string().length(6),
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

const verifyEmailwithOTPDataSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.email(),
  }),
});

const verifyEmailwithOTPResponseSchema = baseResponseSchema(
  verifyEmailwithOTPDataSchema,
);

export type verifyEmailwithOTPPayloadT = z.infer<
  typeof verifyEmailwithOTPPayloadSchema
>;
export type verifyEmailwithOTPResponseT = z.infer<
  typeof verifyEmailwithOTPResponseSchema
>;

export { verifyEmailwithOTPPayloadSchema, verifyEmailwithOTPResponseSchema };
