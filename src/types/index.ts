export enum Currency {
	USD = "USD",
	EUR = "EUR",
	ARS = "ARS",
}

export enum PaymentMethod {
	CREDIT_CARD = "credit_card",
	BANK_TRANSFER = "bank_transfer",
}

export enum PaymentStatus {
	PENDING = "pending",
	PAID = "paid",
	FAILED = "failed",
	REFUNDED = "refunded",
}

export enum Period {
	MONTHLY = "monthly",
	QUARTERLY = "quarterly",
	SEMESTRAL = "semestral",
	ANNUAL = "annual",
}

export enum Role {
	ADMIN = "admin",
	CLIENT = "client",
}

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: Role;
	token: string;
}

export interface Category {
	id: string;
	name: string;
	active: boolean;
}

export interface Plan {
	name: string;
	period: Period;
	price: number;
	active: boolean;
}

export interface Service {
	name: string;
	description: string;
	category: Category;
	plans: Plan[];
	owner: User;
	active: boolean;
}

export interface Subscription {
	status: PaymentStatus;
	method: PaymentMethod;
	subscription: Subscription;
	plan: Plan;
	client: User;
}
