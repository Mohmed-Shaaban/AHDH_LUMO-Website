import {
  loginResponseSchema,
  type loginPayloadT,
  type loginResponseT,
} from '@/schema/auth/login.schema';
import axios from 'axios';
import axiosInstance from '../axiosInstance';
import { API_ENDPOINTS } from '../api.endpoints';

const login = async (payload: loginPayloadT): Promise<loginResponseT> => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.auth.login(),
      payload,
    );
    const validateResponse = loginResponseSchema.parse(response.data);
    return validateResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? error.message);
    }

    throw error;
  }
};

export default login;
