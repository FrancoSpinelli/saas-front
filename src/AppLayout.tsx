import Sidebar from "./Components/Sidebar";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import { ToastContext } from "./Components/Toast";

export default function AppLayout() {
    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
            <ToastContext />
        </Box>
    );
}