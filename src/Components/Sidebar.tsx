import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PaymentIcon from "@mui/icons-material/Payment";
import PeopleIcon from "@mui/icons-material/People";
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { getToken, logout } from "../api/services";

const drawerWidth = 240;

const menuItems = [
  { label: "Inicio", path: "/", icon: <HomeIcon /> },
  { label: "Servicios", path: "/services", icon: <VideoSettingsIcon /> },
  { label: "Categorías", path: "/categories", icon: <CategoryIcon /> },
  { label: "Pagos", path: "/payments", icon: <PaymentIcon /> },
  { label: "Usuarios", path: "/users", icon: <PeopleIcon /> },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  const token = getToken();
  const handleLogout = async () => {
    logout();
    window.location.href = "/login";
  };

  if (!token) {
    return null;
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#042446",
          color: "#fff",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Panel Admin
        </Typography>
      </Toolbar>

      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={pathname === item.path}
              sx={{ "&:hover": { backgroundColor: "#0a3b66" } }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>

        <Divider />

        <List>
          <ListItemButton onClick={handleLogout} sx={{ "&:hover": { backgroundColor: "#0a3b66" } }}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}