import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CategoryIcon from "@mui/icons-material/CategoryOutlined";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MonetizationOnOutlined from '@mui/icons-material/MonetizationOnOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PaymentIcon from "@mui/icons-material/Payment";
import PeopleIcon from "@mui/icons-material/PeopleOutline";
import ShopOutlinedIcon from '@mui/icons-material/ShopOutlined';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';

import {
  Avatar,
  Badge,
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
import { JSX, useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { getUserProfile, removeDataFromStorage } from "../api/services";
import { Role, UserProfile } from "../types";
import { getInitials, nameFormatter } from "../utils";
import ProfileListener from './ProfileListener/ProfileListener';

const drawerWidth = 240;

interface MenuItem {
  label: string;
  path: string;
  icon: JSX.Element;
  badge?: number;
}

const adminMenuItems: MenuItem[] = [
  { label: "Dashboard", path: "/admin", icon: <HomeIcon /> },
  { label: "Usuarios", path: "/users", icon: <PeopleIcon /> },
  { label: "Categorías", path: "/categories", icon: <CategoryIcon /> },
  { label: "Servicios", path: "/services", icon: <VideoSettingsIcon /> },
  { label: "Subscripciones", path: "/subscriptions", icon: <ShopOutlinedIcon /> },
  { label: "Pagos", path: "/payments", icon: <PaymentIcon /> },
  { label: "Planes", path: "/plans", icon: <MonetizationOnOutlined /> },
];

const clientMenuItems: MenuItem[] = [
  { label: "Inicio", path: "/", icon: <HomeIcon /> },
  { label: "Notificaciones", path: "/notifications", icon: <NotificationsIcon />, badge: 1 },
  { label: "Explorar Servicios", path: "/services/all", icon: <VideoSettingsIcon /> },
  { label: "Mis Subscripciones", path: "/subscriptions", icon: <MonetizationOnOutlined /> },
  { label: "Mis Pagos", path: "/payments", icon: <PaymentIcon /> },
  { label: "Mi Perfil", path: "/profile", icon: <AccountCircleOutlinedIcon /> },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  const handleLogout = async () => {
    removeDataFromStorage();
    window.location.href = "/login";
  };
  const [user, setUser] = useState<UserProfile | null>(null);
  const getUser = async () => {
    const res = await getUserProfile();
    setUser(res.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return <div>Cargando...</div>;
  }


  const isAdmin = user?.role === Role.ADMIN;
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
          src={user?.image || `https://placehold.co/100x100/png?text=${getInitials(nameFormatter(user), 2)}`}
          sx={{ width: 40, height: 40 }}
        />
        <Typography variant="body1" noWrap>
          {isAdmin ? "Panel Admin" : ""} {nameFormatter(user)}
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
              <ListItemIcon sx={{ color: "#fff" }}>
                {item.badge ? (
                  <Badge badgeContent={user.unreadNotificationsCount} color="error">
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>

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
      <ProfileListener userId={user._id} onMessage={getUser} />
    </Drawer>
  );
}