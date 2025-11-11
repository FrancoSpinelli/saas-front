import { Category, Plan } from "..";

export interface CreateServiceDTO {
	name: string;
	description: string;
	category: Category;
	plans: Plan[];
	image?: string;
}
