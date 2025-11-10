import { Payment } from "../../types";
import { apiGet } from "../http";

export const getPayments = async () => {
	return apiGet<Payment[]>("/payments");
};
