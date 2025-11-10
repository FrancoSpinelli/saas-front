import { Service } from "../../types";
import { apiGet } from "../http";

export const getServices = async () => {
	return apiGet<Service[]>("/services");
};
