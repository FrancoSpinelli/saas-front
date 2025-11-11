import { RegisterDto } from "../pages/Public/RegisterPage";

export const registerValidation = (registerData: RegisterDto) => {
	const errors: string[] = [];

	const { firstName, lastName, email, password, confirmPassword } =
		registerData;

	if (!firstName.trim() || firstName.trim().length < 2) {
		errors.push("El nombre debe tener al menos 2 caracteres");
	}

	if (!lastName.trim() || lastName.trim().length < 2) {
		errors.push("El apellido debe tener al menos 2 caracteres");
	}

	if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
		errors.push("El correo electrónico es inválido");
	}

	if (!password || password.length < 4) {
		errors.push("La contraseña debe tener al menos 4 caracteres");
	}

	if (password !== confirmPassword) {
		errors.push("Las contraseñas no coinciden");
	}

	return errors;
};
