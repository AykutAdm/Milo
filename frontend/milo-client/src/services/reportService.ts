import type { MonthlyTotal, SpendByCategory } from "../types/report";
import api from "./api";

export const getMonthlyTotal = async (): Promise<number> => {
  const response = await api.get<MonthlyTotal>(
    "/reporting/reports/monthly-total",
  );
  return response.data.monthlyTotal;
};

export const getSpendByCategory = async (): Promise<SpendByCategory[]> => {
  const response = await api.get<SpendByCategory[]>(
    "/reporting/reports/spend-by-category",
  );
  return response.data;
};
