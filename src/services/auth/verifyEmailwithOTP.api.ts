import {
  verifyEmailwithOTPResponseSchema,
  type verifyEmailwithOTPPayloadT,
  type verifyEmailwithOTPResponseT,
} from '@/schema/auth/verifyEmailwithOTP.schema';
import axiosInstance from '../axiosInstance';
import { API_ENDPOINTS } from '../api.endpoints';
import axios from 'axios';

const verifyEmailwithOTP = async (
  payload: verifyEmailwithOTPPayloadT,
): Promise<verifyEmailwithOTPResponseT> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.auth.verifyEmailwithOTP(),
      payload,
    );
    const validateResponse = verifyEmailwithOTPResponseSchema.parse(
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

export default verifyEmailwithOTP;
