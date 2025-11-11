import { LoginData } from "../pages/Public/LoginPage";

export const loginValidation = (loginData: LoginData) => {
	const errors: string[] = [];

	const { email, password } = loginData;

	if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
		errors.push("Ingrese un correo electrónico válido");
	}

	if (!password) {
		errors.push("La contraseña es obligatoria");
	}

	return errors;
};
