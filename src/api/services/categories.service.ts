import { Category } from "../../types";
import { apiGet } from "../http";

export const getCategories = async () => {
	return apiGet<Category[]>("/categories");
};
