import { Subscription } from "../../types";
import { apiGet } from "../http";

export const getSubscriptions = async () => {
	return apiGet<Subscription[]>("/subscriptions");
};
