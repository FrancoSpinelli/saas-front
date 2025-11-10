import { PaymentMethod, PaymentStatus, Period } from "../types";

export const paymentStatusFormatter = (status: PaymentStatus): string => {
	const statusMap: Record<PaymentStatus, string> = {
		[PaymentStatus.PENDING]: "Pendiente",
		[PaymentStatus.PAID]: "Pagado",
		[PaymentStatus.FAILED]: "Fallido",
		[PaymentStatus.REFUNDED]: "Reembolsado",
	};

	return statusMap[status];
};

export const paymentStatusColorsFormatter = (status: PaymentStatus) => {
	const colorMap: Record<
		PaymentStatus,
		"default" | "primary" | "success" | "error"
	> = {
		[PaymentStatus.PENDING]: "primary",
		[PaymentStatus.PAID]: "success",
		[PaymentStatus.FAILED]: "error",
		[PaymentStatus.REFUNDED]: "default",
	};

	return colorMap[status];
};

export const periodFormatter = (period: Period): string => {
	const periodMap: Record<Period, string> = {
		[Period.MONTHLY]: "Mensual",
		[Period.QUARTERLY]: "Trimestral",
		[Period.SEMESTRAL]: "Semestral",
		[Period.ANNUAL]: "Anual",
	};

	return periodMap[period];
};

export const paymentMethodFormatter = (method: PaymentMethod): string => {
	const methodMap: Record<PaymentMethod, string> = {
		[PaymentMethod.CREDIT_CARD]: "Tarjeta de Crédito",
		[PaymentMethod.BANK_TRANSFER]: "Transferencia Bancaria",
	};

	return methodMap[method];
};
