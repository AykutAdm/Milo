import api from "./api"

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password })
  return response.data
}

export const register=async (firstName:string, lastName:string,email: string, password: string) => {
  const response = await api.post("/auth/register", { firstName, lastName, email, password })
  return response.data
}