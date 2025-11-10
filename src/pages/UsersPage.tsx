import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
    Box,
    Chip,
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
import { getUsers } from "../api/services";
import Subtitle from "../Components/Subtitle";
import { Role, User } from "../types";


export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await getUsers();
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (id: string) => {
        console.log("Editar usuario:", id);
    }

    const handleDelete = (id: string) => {
        console.log("Eliminar usuario:", id);
    }

    const handleToggleActive = (id: string, currentState: boolean) => {
        console.log("Toggle usuario:", id, currentState);
    };

    return (
        <Box p={3}>
            
            <Subtitle>
                Usuarios
            </Subtitle>

            <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><strong>Activo</strong></TableCell>
                            <TableCell><strong>Avatar</strong></TableCell>
                            <TableCell><strong>Nombre</strong></TableCell>
                            <TableCell><strong>Correo</strong></TableCell>
                            <TableCell><strong>Rol</strong></TableCell>
                            <TableCell align="right"><strong>Acciones</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} hover>
                                <TableCell align="left">
                                    <Switch
                                        checked={user.active}
                                        onChange={() =>
                                            handleToggleActive(user.id, user.active)
                                        }
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell>
                                    <img
                                        src={user.image}
                                        alt={user.firstName}
                                        style={{ width: 40, height: 40, borderRadius: "50%" }}
                                    />
                                </TableCell>
                                <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role === Role.ADMIN ? "Admin" : "Cliente"}
                                        color={user.role === Role.ADMIN ? "primary" : "default"}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Editar">
                                        <IconButton onClick={() => handleEdit(user.id)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Eliminar">
                                        <IconButton color="error" onClick={() => handleDelete(user.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}