import { CreateCategoryDTO } from "../types/dto";

export const categoryValidation = (category: CreateCategoryDTO) => {
	const errors: string[] = [];

	const { name, description } = category;

	if (!name.trim()) {
		errors.push("El nombre es obligatorio");
	}

	if (!description.trim()) {
		errors.push("La descripción es obligatoria");
	}

	return errors;
};
