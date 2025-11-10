import { Service } from "../../types";
import { apiGet, apiPatch } from "../http";

export const getServices = async () => {
	return apiGet<Service[]>("/services");
};

export const activeServiceToggle = async (id: string) => {
	return apiPatch<Service>(`/services/${id}/activeToggle`);
};