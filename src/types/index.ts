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
	active: boolean;
	image?: string;
	token: string;
}

export interface Category {
	id: string;
	name: string;
	description: string;
	image?: string;
	active: boolean;
}

export interface Plan {
	id: string;
	name: string;
	period: Period;
	price: number;
	active: boolean;
	currency: Currency;
}

export interface Service {
	id: string;
	name: string;
	description: string;
	category: Category;
	plans: Plan[];
	owner: User;
	active: boolean;
	image?: string;
}

export interface Subscription {
	id: string;
	client: User;
	plan: Plan;
	service: Service;
	startDate: Date;
	endDate: Date;
}

export interface Payment {
	id: string;
	status: PaymentStatus;
	method: PaymentMethod;
	subscription: Subscription;
	plan: Plan;
	client: User;
	paidAt: Date;
}
