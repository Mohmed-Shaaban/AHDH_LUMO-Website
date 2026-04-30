import {
  forgetPasswordResponseSchema,
  type forgetPasswordPayloadT,
  type forgetPasswordResponseT,
} from '@/schema/auth/forgetPassword.schema';
import axiosInstance from '../axiosInstance';
import { API_ENDPOINTS } from '../api.endpoints';
import axios from 'axios';

const forgetPassword = async (
  payload: forgetPasswordPayloadT,
): Promise<forgetPasswordResponseT> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.auth.forgetPassword(),
      payload,
    );
    const validateResponse = forgetPasswordResponseSchema.parse(response.data);
    return validateResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? error.message);
    }

    throw error;
  }
};

export default forgetPassword;
