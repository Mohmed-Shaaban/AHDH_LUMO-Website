import { endpoint } from './utils';

export const API_ENDPOINTS = {
  user: {
    me: endpoint('/users/me'),
  },
  auth: {
    login: endpoint('/auth/login'),
    signup: endpoint('/auth/signup'),
    verifyEmailwithOTP: endpoint('/auth/verify-otp'),
    resendVerificationCode: endpoint('/auth/resend-verification'),
    forgetPassword: endpoint('/auth/forgot-password'),
  },
} as const;
