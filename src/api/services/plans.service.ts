import { Plan } from "../../types";
import { CreatePlanDTO } from "../../types/dto";
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "../http";

export const getPlans = async () => {
	return apiGet<Plan[]>("/plans");
};

export const getPlanById = async (id: string) => {
	return apiGet<Plan>(`/plans/${id}`);
};

export const createPlan = async (planData: CreatePlanDTO) => {
	return apiPost("/plans", planData);
};

export const updatePlan = async (id: string, planData: CreatePlanDTO) => {
	return apiPut(`/plans/${id}`, planData);
};

export const activePlanToggle = async (id: string) => {
	return apiPatch<Plan[]>(`/plans/${id}/activeToggle`);
};

export const deletePlan = async (id: string) => {
	return apiDelete<Plan[]>(`/plans/${id}`);
};
