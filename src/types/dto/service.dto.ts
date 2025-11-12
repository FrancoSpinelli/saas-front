import { Category, Plan } from "..";

export interface CreateServiceDTO {
	name: string;
	shortDescription: string;
	longDescription: string;
	category: Category;
	plans: Plan[];
	image?: string;
}
