import type { ApiResponse, Section } from "@/types";
import axiosInstance from "../axiosInstance";
import type { createSectionType } from "@/schema/section/sectionSchemas";

export const getSections = async (): Promise<Section[]> => {
  const response = await axiosInstance.get<ApiResponse<Section[]>>("/sections");

  return response.data.data;
};

export const createSection = async (data: createSectionType) => {
  const response = await axiosInstance.post("/sections", data);

  return response.data;
};

export const deleteSection = async (id: number | string) => {
  const response = await axiosInstance.delete(`/sections/${id}`);

  return response.data;
};