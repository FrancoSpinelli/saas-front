import CategoryIcon from "@mui/icons-material/CategoryOutlined";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MonetizationOnOutlined from '@mui/icons-material/MonetizationOnOutlined';
import PaymentIcon from "@mui/icons-material/Payment";
import PeopleIcon from "@mui/icons-material/PeopleOutline";
import ShopOutlinedIcon from '@mui/icons-material/ShopOutlined';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import {
  Avatar,
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
import { getToken, getUserFromStorage, logout } from "../api/services";
import { getInitials } from "../utils";

const drawerWidth = 240;

const menuItems = [
  { label: "Inicio", path: "/", icon: <HomeIcon /> },
  { label: "Usuarios", path: "/users", icon: <PeopleIcon /> },
  { label: "Categorías", path: "/categories", icon: <CategoryIcon /> },
  { label: "Servicios", path: "/services", icon: <VideoSettingsIcon /> },
  { label: "Planes", path: "/plans", icon: <MonetizationOnOutlined /> },
  { label: "Subscripciones", path: "/subscriptions", icon: <ShopOutlinedIcon /> },
  { label: "Pagos", path: "/payments", icon: <PaymentIcon /> },
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

  const profile = getUserFromStorage();

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
      <Toolbar sx={{ display: "flex", flexDirection: "column", gap: 1, py: 1 }}>
        <Avatar
          variant="rounded"
          src={profile?.image || `https://placehold.co/100x100/png?text=${getInitials(profile?.firstName + " " + profile?.lastName, 2)}`}
          sx={{ width: 48, height: 48 }}
        />
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