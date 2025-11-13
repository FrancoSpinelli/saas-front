import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
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
import { getToken, getUserFromStorage, removeDataFromStorage } from "../api/services";
import { Role } from "../types";
import { getInitials, nameFormatter } from "../utils";

const drawerWidth = 240;

const adminMenuItems = [
  { label: "Inicio", path: "/admin", icon: <HomeIcon /> },
  { label: "Usuarios", path: "/users", icon: <PeopleIcon /> },
  { label: "Categorías", path: "/categories", icon: <CategoryIcon /> },
  { label: "Servicios", path: "/services", icon: <VideoSettingsIcon /> },
  { label: "Subscripciones", path: "/subscriptions", icon: <ShopOutlinedIcon /> },
  { label: "Planes", path: "/plans", icon: <MonetizationOnOutlined /> },
  { label: "Pagos", path: "/payments", icon: <PaymentIcon /> },
];

const clientMenuItems = [
  { label: "Inicio", path: "/", icon: <HomeIcon /> },
  { label: "Explorar Servicios", path: "/services/all", icon: <VideoSettingsIcon /> },
  { label: "Mis Subscripciones", path: "/subscriptions", icon: <MonetizationOnOutlined /> },
  { label: "Mis Pagos", path: "/payments", icon: <PaymentIcon /> },
  { label: "Mi Perfil", path: "/profile", icon: <AccountCircleOutlinedIcon /> },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  const token = getToken();
  const handleLogout = async () => {
    removeDataFromStorage();
    window.location.href = "/login";
  };

  if (!token) {
    return null;
  }

  let isAdmin = false;
  const profile = getUserFromStorage();
  if (!profile) {
    return null;
  }

  isAdmin = profile.role === Role.ADMIN;

  const menuItems = isAdmin ? adminMenuItems : clientMenuItems;
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
          src={profile?.image || `https://placehold.co/100x100/png?text=${getInitials(nameFormatter(profile), 2)}`}
          sx={{ width: 40, height: 40 }}
        />
        <Typography variant="body1" noWrap>
          {isAdmin ? "Panel Admin" : ""} {nameFormatter(profile)}
        </Typography>
      </Toolbar>

      <Divider style={{
        borderColor: "gray",
        marginTop: '10px'
      }} />

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