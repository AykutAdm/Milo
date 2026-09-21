import type { Platform } from "../types/platform";
import api from "./api";

export const getPlatforms = async (): Promise<Platform[]> => {
  const response = await api.get<Platform[]>("/subscription/platforms");
  return response.data;
};
