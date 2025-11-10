import type { User } from "../../types";
import { apiGet } from "../http";

export const getUsers = async () => {
	return apiGet<User[]>("/users");
};
