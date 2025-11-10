import { Plan } from "../../types";
import { apiGet, apiPatch } from "../http";

export const getPlans = async () => {
	return apiGet<Plan[]>("/plans");
};

export const activePlanToggle = async (id: string) => {
	return apiPatch<Plan[]>(`/plans/${id}/activeToggle`);
};
