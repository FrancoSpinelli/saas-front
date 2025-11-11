import { Subscription } from "../../types";
import { apiGet } from "../http";

export const getSubscriptions = async (userId?: string) => {
	if (userId) return apiGet<Subscription[]>(`/subscriptions/user/${userId}`);
	return apiGet<Subscription[]>(`/subscriptions`);
};
