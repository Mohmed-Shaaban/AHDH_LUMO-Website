import z from 'zod';

const resendVerificationCodePayloadSchema = z.object({
  email: z.email(),
});

const resendVerificationCodeDataSchema = z.object({
  verificationCode: z.string(),
  expiresIn: z.string(),
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

const resendVerificationCodeResponseSchema = baseResponseSchema(
  resendVerificationCodeDataSchema,
);

export type resendVerificationCodePayloadT = z.infer<
  typeof resendVerificationCodePayloadSchema
>;
export type resendVerificationCodeDataT = z.infer<
  typeof resendVerificationCodeDataSchema
>;
export type resendVerificationCodeResponseT = z.infer<
  typeof resendVerificationCodeResponseSchema
>;

export {
  resendVerificationCodePayloadSchema,
  resendVerificationCodeDataSchema,
  resendVerificationCodeResponseSchema,
};
