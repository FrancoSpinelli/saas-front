import { Category } from "../../types";
import { apiGet, apiPatch } from "../http";

export const getCategories = async () => {
	return apiGet<Category[]>("/categories");
};

export const activeCategoryToggle = async (id: string) => {
	return apiPatch<Category[]>(`/categories/${id}/activeToggle`);
};
