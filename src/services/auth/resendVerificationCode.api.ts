import {
  resendVerificationCodeResponseSchema,
  type resendVerificationCodePayloadT,
  type resendVerificationCodeResponseT,
} from '@/schema/auth/resendVerificationCode.schema';
import { API_ENDPOINTS } from '../api.endpoints';
import axiosInstance from '../axiosInstance';
import axios from 'axios';

const resendVerificationCode = async (
  payload: resendVerificationCodePayloadT,
): Promise<resendVerificationCodeResponseT> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.auth.resendVerificationCode(),
      payload,
    );
    const validateResponse = resendVerificationCodeResponseSchema.parse(
      response.data,
    );
    return validateResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? error.message);
    }

    throw error;
  }
};

export default resendVerificationCode;
