import { Plan } from "../../types";
import { apiGet } from "../http";

export const getPlans = async () => {
	return apiGet<Plan[]>("/plans");
};
