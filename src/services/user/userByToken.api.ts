import {
  userByTokenResponseSchema,
  type userByTokenResponseT,
} from '@/schema/user/userByToken.schema';
import { API_ENDPOINTS } from '../api.endpoints';
import axiosInstance from '../axiosInstance';
import axios from 'axios';

const userByToken = async (): Promise<userByTokenResponseT> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.user.me());
    const validateResponse = userByTokenResponseSchema.parse(response.data);
    return validateResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? error.message);
    }

    throw error;
  }
};

export default userByToken;
