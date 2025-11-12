import { CreateServiceDTO } from "../types/dto";

export const serviceValidation = (service: CreateServiceDTO) => {
	const errors: string[] = [];

	const { name, category, plans, image, shortDescription } = service;

	if (!name.trim() || name.trim().length < 2 || name.trim().length > 100) {
		errors.push("El nombre debe tener entre 2 y 100 caracteres");
	}

	if (
		!shortDescription ||
		shortDescription.trim().length < 5 ||
		shortDescription.trim().length > 200
	) {
		errors.push("La descripción debe tener entre 5 y 200 caracteres");
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
