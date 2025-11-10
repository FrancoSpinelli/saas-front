import type { User } from "../../types";
import { apiGet, apiPatch } from "../http";

export const getUsers = async () => {
	return apiGet<User[]>("/users");
};

export const activeUserToggle = async (id: string) => {
	return apiPatch<User>(`/users/${id}/activeToggle`);
};
