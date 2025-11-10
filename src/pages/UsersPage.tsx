import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Avatar,
    Box,
    Checkbox,
    Chip,
    FormControlLabel,
    IconButton,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { activeUserToggle, getUsers } from "../api/services";
import Subtitle from "../Components/Subtitle";
import { Role, User } from "../types";
import { nameFormatter } from "../utils";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [, setLoading] = useState(true);

    const [showInactive, setShowInactive] = useState(false);

    const fetchUsers = async () => {
        try {
            const res = await getUsers();
            const users = res.data;
            if (!showInactive) {
                const activeUsers = users.filter((u: User) => u.active);
                setUsers(activeUsers);
                return;
            }
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [showInactive]);

    const handleEdit = (id: string) => {
        console.log("Editar usuario:", id);
    };

    const handleView = (id: string) => {
        console.log("Ver usuario:", id);
    };

    const handleToggleActive = async (id: string, currentState: boolean) => {
        const response = await activeUserToggle(id);
        if (response.success) {
            toast.success(`Usuario ${currentState ? "desactivado" : "activado"} exitosamente`);
            fetchUsers();
        }
    };

    return (
        <Box p={3}>
            <Subtitle>Usuarios</Subtitle>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Activo</strong></TableCell>
                            <TableCell><strong>Avatar</strong></TableCell>
                            <TableCell><strong>Nombre</strong></TableCell>
                            <TableCell><strong>Correo</strong></TableCell>
                            <TableCell align="center"><strong>Rol</strong></TableCell>
                            <TableCell align="right"><strong>Acciones</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id} hover>
                                <TableCell>
                                    <Switch
                                        checked={user.active}
                                        onChange={() => handleToggleActive(user._id, user.active)}
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Avatar
                                        src={user.image}
                                        alt={nameFormatter(user)}
                                        sx={{ width: 48, height: 48 }}
                                    />
                                </TableCell>

                                <TableCell>{nameFormatter(user)}</TableCell>

                                <TableCell>{user.email}</TableCell>

                                <TableCell align="center">
                                    <Chip
                                        label={user.role === Role.ADMIN ? "Admin" : "Cliente"}
                                        color={user.role === Role.ADMIN ? "primary" : "default"}
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell align="right">
                                    <Tooltip title="Editar">
                                        <IconButton onClick={() => handleEdit(user._id)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Ver">
                                        <IconButton color="primary" onClick={() => handleView(user._id)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={2} display="flex" justifyContent="flex-end">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showInactive}
                            onChange={(e) => setShowInactive(e.target.checked)}
                        />
                    }
                    label="Mostrar inactivos"
                />
            </Box>
        </Box>
    );
}