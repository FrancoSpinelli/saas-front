import { Notification } from "../../types";
import { apiGet, apiPost } from "../http";

export const getNotifications = async () => {
	return apiGet<Notification[]>("/notifications");
};

export const markAllAsRead = async () => {
	return apiPost<void>("/notifications/readAll", {});
};
