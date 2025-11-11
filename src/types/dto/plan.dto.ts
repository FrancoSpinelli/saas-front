import { Currency, Period } from "..";

export interface CreatePlanDTO {
	name: string;
	period: Period;
	currency: Currency;
	price: number;
}
