import type { User } from "../../types";
import { apiDelete, apiGet, apiPatch, apiPost } from "../http";
import { Credentials } from "./auth.service";

export const getUsers = async () => {
	return apiGet<User[]>("/users");
};

export const registerAdmin = async (userData: Credentials) => {
	return apiPost<User>("/users", userData);
};

export const activeUserToggle = async (id: string) => {
	return apiPatch<User>(`/users/${id}/activeToggle`);
};

export const deleteUser = async (id: string) => {
	return apiDelete<User>(`/users/${id}`);
};
