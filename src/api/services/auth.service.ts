import type { User } from "../../types";
import { apiPost } from "../http";

export interface Credentials {
	email: string;
	password: string;
}

export const login = async (credentials: Credentials) => {
	return apiPost<User>("/auth/sign-in", credentials);
};

export const logout = async () => {
	localStorage.removeItem("token");
	sessionStorage.removeItem("token");
};

export const register = async (userData: Credentials) => {
	return apiPost<User>("/auth/sign-up", userData);
};

export const getToken = (): string | null => {
	const token =
		localStorage.getItem("token") || sessionStorage.getItem("token");
	return token;
};

export const getUserFromStorage = (): User | null => {
	const userData =
		localStorage.getItem("user") || sessionStorage.getItem("user");
	if (userData) {
		return JSON.parse(userData) as User;
	}
	return null;
};