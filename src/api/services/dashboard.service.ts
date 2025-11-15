import { DashboardData } from "../../types";
import { apiGet } from "../http";


export const getDashboardData = async () => {
	return apiGet<DashboardData>("/dashboard");
};
