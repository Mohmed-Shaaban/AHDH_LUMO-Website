export const cookiesQueryKeys = {
  token: 'token',
  verificationCode: 'verificationCode',
  SignupCreatedAt: 'SignupCreatedAt',
  email: 'email',
} as const;

export type CookieKey =
  (typeof cookiesQueryKeys)[keyof typeof cookiesQueryKeys];

export type CookieName = CookieKey | (string & {});
