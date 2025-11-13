import { Subscription } from "../../types";
import { apiGet, apiPost } from "../http";

export const getSubscriptions = async (userId?: string) => {
	if (userId) return apiGet<Subscription[]>(`/subscriptions/user/${userId}`);
	return apiGet<Subscription[]>(`/subscriptions`);
};

export const createSubscription = async (data: {
	serviceId: string;
	planId: string;
}) => {
	return apiPost<Subscription>(`/subscriptions`, data);
};

export const renewSubscription = async (subscriptionId: string) => {
	return apiPost<Subscription>(`/subscriptions/${subscriptionId}/renew`, {});
}

export const cancelSubscription = async (subscriptionId: string) => {
	return apiPost<Subscription>(`/subscriptions/${subscriptionId}/cancel`);
};
