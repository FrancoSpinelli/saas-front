import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import { ToastContext } from "./Components/Toast";

export default function AppLayout() {
    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                <Outlet />
            </Box>
            <ToastContext />
        </Box>
    );
}