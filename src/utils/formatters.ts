import {
	PaymentMethod,
	PaymentStatus,
	Period,
	Plan,
	SubscriptionStatus,
	User,
} from "../types";

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
		"default" | "warning" | "success" | "error"
	> = {
		[PaymentStatus.PENDING]: "warning",
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

export const dateFormatter = (date: Date): string => {
	return new Date(date).toLocaleDateString("es-AR", { dateStyle: "medium" });
};

export const nameFormatter = (user: User): string => {
	return `${user.firstName} ${user.lastName}`;
};

export const planInfoFormatter = (plan: Plan): string => {
	return `[${periodFormatter(plan.period)}] ${plan.name}: ${plan.price} ${
		plan.currency
	}`;
};

export const subscriptionStatusFormatter = (
	status: SubscriptionStatus
): string => {
	const statusMap: Record<SubscriptionStatus, string> = {
		[SubscriptionStatus.ACTIVE]: "Activo",
		[SubscriptionStatus.PENDING_PAYMENT]: "Pago Pendiente",
		[SubscriptionStatus.EXPIRED]: "Expirado",
		[SubscriptionStatus.CANCELED]: "Cancelado",
	};
	return statusMap[status];
};

export const subscriptionStatusColorsFormatter = (status: SubscriptionStatus) => {
	const colorMap: Record<
		SubscriptionStatus,
		"default" | "warning" | "success" | "error"
	> = {
		[SubscriptionStatus.ACTIVE]: "success",
		[SubscriptionStatus.PENDING_PAYMENT]: "warning",
		[SubscriptionStatus.EXPIRED]: "error",
		[SubscriptionStatus.CANCELED]: "error",
	};

	return colorMap[status];
};

