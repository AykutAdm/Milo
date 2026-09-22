
import type { AccountInfo, GetPassword } from "../types/accountInfo";
import api from "./api";

export const getAccountInfos = async (): Promise<AccountInfo[]> => {
  const response = await api.get<AccountInfo[]>("/subscription/accountInfos");
  return response.data;
};

export const getAccountInfoById = async (id: string): Promise<AccountInfo> => {
  const response = await api.get<AccountInfo>(
    `/subscription/accountInfos/${id}`,
  );
  return response.data;
};

export const deleteAccountInfo = async (id: string) => {
  await api.delete(`/subscription/accountInfos/${id}`);
};

export const createAccountInfo = async (accountInfo: {
  platformId: string;
  email: string;
  username: string;
  password: string;
  description: string;
}) => {
  await api.post("/subscription/accountInfos", accountInfo);
};

export const updateAccountInfo = async (accountInfo: {
  accountInfoId: string;
  platformId: string;
  email: string;
  username: string;
  password: string;
  description: string;
}) => {
  await api.put("/subscription/accountInfos", accountInfo);
};

export const showPassword = async (
  accountInfoId: string,
): Promise<GetPassword> => {
  const response = await api.get<GetPassword>(
    `/subscription/accountInfos/${accountInfoId}/password`,
  );
  return response.data;
};
