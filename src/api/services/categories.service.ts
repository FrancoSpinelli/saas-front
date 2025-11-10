import { Category } from "../../types";
import { CreateCategoryDTO } from "../../types/dto";
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "../http";

export const getCategories = async () => {
	return apiGet<Category[]>("/categories");
};

export const getCategoryById = async (id: string) => {
	return apiGet<Category>(`/categories/${id}`);
};

export const activeCategoryToggle = async (id: string) => {
	return apiPatch<Category[]>(`/categories/${id}/activeToggle`);
};

export const createCategory = async (category: CreateCategoryDTO) => {
	return apiPost("/categories", category);
};

export const updateCategory = async (
	id: string,
	category: CreateCategoryDTO
) => {
	return apiPut(`/categories/${id}`, category);
};

export const deleteCategory = async (id: string) => {
	return apiDelete<Category[]>(`/categories/${id}`);
};
