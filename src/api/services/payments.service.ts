import { Payment } from "../../types";
import { apiGet } from "../http";

export const getPayments = async (userId?: string) => {
	if (userId) return apiGet<Payment[]>(`/payments/user/${userId}`);
	return apiGet<Payment[]>("/payments");
};
