import api from "./api";

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  const response = await api.post("/auth/register", {
    firstName,
    lastName,
    email,
    password,
  });
  return response.data;
};

export const loginWith2fa = async (userId: string, code: string) => {
  const response = await api.post("/auth/login/2fa", { userId, code });
  return response.data;
};

export const setup2fa = async () => {
  const response = await api.get("/auth/2fa/setup");
  return response.data;
};

export const enable2fa = async (code: string) => {
  const response = await api.post("/auth/2fa/enable", { code });
  return response.data;
};

export const disable2fa = async () => {
  const response = await api.post("/auth/2fa/disable");
  return response.data;
};

export const get2faStatus = async (): Promise<boolean> => {
  const response = await api.get<boolean>("/auth/2fa/status");
  return response.data;
};

export const updateProfile = async (
  firstName: string,
  lastName: string,
  profileImageUrl: string,
) => {
  const response = await api.put("/auth/profile", {
    firstName,
    lastName,
    profileImageUrl,
  });
  return response.data;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  const response = await api.put("/auth/change-password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};
