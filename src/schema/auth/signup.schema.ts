import z from 'zod';

const signupPayloadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .min(3, 'Full name must be at least 3 characters')
    .max(50, 'Full name must not exceed 50 characters')
    .regex(/^[A-Za-z\s]+$/, 'Full name can only contain letters and spaces'),
  email: z
    .email('Invalid email address')
    .min(1, 'Email is required')
    .toLowerCase()
    .trim(),
  username: z
    .string()
    .trim()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .regex(
      /^[a-zA-Z][a-zA-Z0-9_]*$/,
      'Username must start with a letter and contain only letters, numbers, and underscores',
    ),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(55, 'Password is too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character',
    ),
});

const signupUserSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
  createdBy: z.any().nullable(),
  updatedBy: z.any().nullable(),
  deletedBy: z.any().nullable(),
  email: z.string(),
  password: z.string(),
  fullName: z.string(),
  profilePicture: z.string().nullable(),
  timezone: z.string(),
  preferences: z.record(z.string(), z.any()),
  isActive: z.boolean(),
  emailVerified: z.boolean(),
  lastLoginAt: z.string().nullable(),
  status: z.string(),
  username: z.string(),
  verificationToken: z.string().nullable(),
  verificationTokenExpires: z.string().nullable(),
  passwordResetToken: z.string().nullable(),
  passwordResetExpires: z.string().nullable(),
  otp: z.string().nullable(),
  otpExpires: z.string().nullable(),
});

const signupDataSchema = z.object({
  user: signupUserSchema,
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

const signupResponseSchema = baseResponseSchema(signupDataSchema);

const signupErrorResponseSchema = z.object({
  status: z.literal(false),
  message: z.string(),
  timestamp: z.string(),
  path: z.string(),
  code: z.string(),
});

export type signupResponseT = z.infer<typeof signupResponseSchema>;
export type signupDataT = z.infer<typeof signupDataSchema>;
export type signupPayloadT = z.infer<typeof signupPayloadSchema>;
export type signupErrorResponseT = z.infer<typeof signupErrorResponseSchema>;

export {
  signupResponseSchema,
  signupDataSchema,
  signupPayloadSchema,
  signupErrorResponseSchema,
};
