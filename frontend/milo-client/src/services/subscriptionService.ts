import type { Subscription } from "../types/subscription";
import api from "./api";

export const getSubscriptions = async (): Promise<Subscription[]> => {
  const response = await api.get<Subscription[]>(
    "/subscription/userSubscriptions",
  );
  return response.data;
};

export const deleteSubscription = async (id: string) => {
  await api.delete(`/subscription/userSubscriptions/${id}`);
};

export const createSubscription = async (subscription: {
  price: number;
  period: string;
  renewalDate: string;
  userSubscriptionStatus: number;
  platformId: string;
}) => {
  await api.post("/subscription/userSubscriptions", subscription);
};
