import { Navigate } from "react-router-dom";
import { Role } from "../types";

interface Props {
	role?: Role;
	children: React.ReactNode;
}

const ProtectedRoute = ({ children, role = Role.ADMIN }: Props) => {
	const token = localStorage.getItem("token") || sessionStorage.getItem("token");
	if (!token) {
		return <Navigate to="/login" replace />;
	}

	const user = localStorage.getItem("user") || sessionStorage.getItem("user");
	if (!user) {
		return <Navigate to="/login" replace />;
	}

	const userRole = JSON.parse(user).role as Role;
	if (userRole !== role) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
