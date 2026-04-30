import {
  signupResponseSchema,
  type signupPayloadT,
  type signupResponseT,
} from '@/schema/auth/signup.schema';
import axiosInstance from '../axiosInstance';
import { API_ENDPOINTS } from '../api.endpoints';
import axios from 'axios';

const signup = async (payload: signupPayloadT): Promise<signupResponseT> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.auth.signup(),
      payload,
    );
    const validateResponse = signupResponseSchema.parse(response.data);
    return validateResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? error.message);
    }

    throw error;
  }
};

export default signup;
