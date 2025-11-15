export enum Currency {
	USD = "USD",
	/* 	EUR = "EUR",
	ARS = "ARS", */
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

export enum SubscriptionStatus {
	ACTIVE = "ACTIVE",
	PENDING_PAYMENT = "PENDING_PAYMENT",
	EXPIRED = "EXPIRED",
	CANCELED = "CANCELED",
}

export interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: Role;
	active: boolean;
	image?: string;
	description?: string;
	token: string;
	paymentMethod: PaymentMethod;
	createdAt: Date;
}

export interface Category {
	_id: string;
	name: string;
	description: string;
	image?: string;
	active: boolean;
}

export interface Plan {
	_id: string;
	name: string;
	period: Period;
	price: number;
	active: boolean;
	currency: Currency;
}

export interface Service {
	_id: string;
	name: string;
	shortDescription: string;
	longDescription: string;
	category: Category;
	plans: Plan[];
	owner: User;
	active: boolean;
	image?: string;
}

export interface Subscription {
	_id: string;
	client: User;
	plan: Plan;
	service: Service;
	startDate: Date;
	endDate: Date;
	status: SubscriptionStatus;
	lastPaymentDate?: Date;
}

export interface Payment {
	_id: string;
	status: PaymentStatus;
	method: PaymentMethod;
	subscription: Subscription;
	plan: Plan;
	client: User;
	amount: number;
	from: Date;
	to: Date;
	paidAt: Date;
}

export interface UserProfile extends User {
	services: Service[];
	subscriptions: Subscription[];
	payments: Payment[];
	interests: Category[];
}

export interface DashboardData {
	totalSubscriptions: number;
	totalAdmins: number;
	totalClients: number;
	totalServices: number;

	subscriptionsByCategory: {
		categoryName: string;
		total: number;
	}[];

	activeSubscriptions: number;
	pendingPaymentSubscriptions: number;
	canceledSubscriptions: number;
	expiredSubscriptions: number;

	revenueThisMonth: number;
	revenueLastMonth: number;
	totalRevenue: number;

	lastClientSubscriptions: Subscription[];

	lastPayments: Payment[];

	topSubscribedServices: {
		service: Service;
		count: number;
	}[];
}
