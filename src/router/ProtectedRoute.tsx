import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, removeDataFromStorage } from "../api/services";
import { Role } from "../types";

interface Props {
	role?: Role[];
	children: React.ReactNode;
}

const ProtectedRoute = ({ children, role = [Role.ADMIN] }: Props) => {
	const navigate = useNavigate();


	const fetchUser = async () => {
		try {
			const res = await getUserProfile();
			const userRole = res.data.role;
			if (!role.includes(res.data.role!)) {
				let to = "/login"
				if (userRole === Role.CLIENT) {
					to = "/"
				}
				if (userRole === Role.ADMIN) {
					to = "/admin"
				}
				return navigate(to);
			}

		} catch (error: any) {
			if (error.status == 401) {
				console.error(error);
				removeDataFromStorage();
				return navigate("/login")
			}
		}
	};

	useEffect(() => {
		fetchUser()
	}, [])

	return <>{children}</>;
};

export default ProtectedRoute;
