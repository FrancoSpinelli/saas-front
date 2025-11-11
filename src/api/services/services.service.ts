import { Service } from "../../types";
import { CreateServiceDTO } from "../../types/dto";
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "../http";

export const getServices = async () => {
	return apiGet<Service[]>("/services");
};

export const getServiceById = async (id: string) => {
	return apiGet<Service>(`/services/${id}`);
};

export const createService = async (service: CreateServiceDTO) => {
	return apiPost("/services", service);
};

export const updateService = async (id: string, service: CreateServiceDTO) => {
	return apiPut(`/services/${id}`, service);
};

export const activeServiceToggle = async (id: string) => {
	return apiPatch<Service>(`/services/${id}/activeToggle`);
};

export const deleteService = async (id: string) => {
	return apiDelete<Service>(`/services/${id}`);
};
