export const authKeys = {
  all: ['auth'] as const,
  login: (token: string) => [...authKeys.all, 'login', token] as const,
  signup: () => [...authKeys.all, 'signup'] as const,
  verifyEmailwithOTP: (otp: string) =>
    [...authKeys.all, 'verifyEmailwithOTP', otp] as const,
  resendVerificationCode: (otp: string) =>
    [...authKeys.all, 'resendVerificationCode', otp] as const,
  forgetPassword: (email?: string) =>
    [...authKeys.all, 'forgetPassword', email] as const,
};
