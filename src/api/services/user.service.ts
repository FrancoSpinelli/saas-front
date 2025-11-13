import type { User, UserProfile } from "../../types";
import { apiDelete, apiGet, apiPatch, apiPost } from "../http";
import { Credentials } from "./auth.service";

export const getUsers = async () => {
	return apiGet<User[]>("/users");
};

export const getUserProfile = async () => {
	return apiGet<UserProfile>(`/users/profile`);
};

export const registerAdmin = async (userData: Credentials) => {
	return apiPost<User>("/users", userData);
};

export const updateUserProfile = async (
	userId: string,
	userData: Partial<UserProfile>
) => {
	return apiPatch<UserProfile>(`/users/${userId}`, userData);
};

export const activeUserToggle = async (id: string) => {
	return apiPatch<User>(`/users/${id}/activeToggle`);
};

export const deleteUser = async (id: string) => {
	return apiDelete<User>(`/users/${id}`);
};
