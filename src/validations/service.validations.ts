import { CreateServiceDTO } from "../types/dto";

export const serviceValidation = (service: CreateServiceDTO) => {
	const errors: string[] = [];

	const { name, category, plans, image, description } = service;

	if (!name.trim() || name.trim().length < 2) {
		errors.push("El nombre debe tener al menos 2 caracteres");
	}

	if (!description || description.trim().length < 5) {
		errors.push("La descripción debe tener al menos 5 caracteres");
	}

	if (!category) {
		errors.push("Seleccione una categoría");
	}

	if (!plans || !plans.length) {
		errors.push("Debe seleccionar al menos un plan");
	}

	if (image && typeof image !== "string") {
		errors.push("La imagen debe ser una cadena");
	}

	return errors;
};
