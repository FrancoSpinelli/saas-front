import axios, {
	AxiosError,
	type AxiosRequestConfig,
	type AxiosResponse,
} from "axios";
import { toast } from "react-toastify";
import { getToken, logout } from "./services";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const http = axios.create({
	baseURL: API_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

interface ResponseData<T> {
	data: T;
	message: string;
	success: boolean;
	count?: number;
}

http.interceptors.request.use(
	(config) => {
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

http.interceptors.response.use(
	(response: AxiosResponse<ResponseData<unknown>>) => {
		return response;
	},
	async (error: AxiosError<ResponseData<unknown>>) => {
		const message = error.response?.data?.message;
		if (message === "Token inválido o expirado") {
			toast.error("Por favor, inicie sesión nuevamente.", {
				onClose: () => {
					window.location.href = "/login";
				},
			});
			logout();
		}
		return Promise.reject(error);
	}
);

export async function apiGet<T>(
	url: string,
	config?: AxiosRequestConfig
): Promise<ResponseData<T>> {
	const response = await http.get<ResponseData<T>>(url, config);
	return response.data;
}

export async function apiPost<T>(
	url: string,
	data?: unknown,
	config?: AxiosRequestConfig
): Promise<ResponseData<T>> {
	const response = await http.post<ResponseData<T>>(url, data, config);
	return response.data;
}

export const apiPut = async <T>(
	url: string,
	data?: unknown,
	config?: AxiosRequestConfig
): Promise<ResponseData<T>> => {
	const response = await http.put<ResponseData<T>>(url, data, config);
	return response.data;
};

export async function apiPatch<T>(
	url: string,
	data?: unknown,
	config?: AxiosRequestConfig
): Promise<ResponseData<T>> {
	const response = await http.patch<ResponseData<T>>(url, data, config);
	return response.data;
}

export async function apiDelete<T>(
	url: string,
	config?: AxiosRequestConfig
): Promise<ResponseData<T>> {
	const response = await http.delete<ResponseData<T>>(url, config);
	return response.data;
}
