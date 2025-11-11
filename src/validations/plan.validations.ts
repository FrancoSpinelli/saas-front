import { CreatePlanDTO } from "../types/dto";

export const planValidation = (plan: CreatePlanDTO) => {
	const errors: string[] = [];

	const { name, period, currency, price } = plan;

	if (!name.trim()) {
		errors.push("El nombre es obligatorio");
	}

	if (name.trim().length < 2) {
		errors.push("El nombre debe tener al menos 2 caracteres");
	}

	if (!period) {
		errors.push("El período es obligatorio");
	}

	if (!currency) {
		errors.push("La moneda es obligatoria");
	}

	if (!price || price <= 0) {
		errors.push("El precio debe ser mayor a 0");
	}

	return errors;
};
