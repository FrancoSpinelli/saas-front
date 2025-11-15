import { Add } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { useEffect, useState } from "react";
import { getUsers } from "../../api/services";
import Subtitle from "../../Components/Subtitle";
import { Role, User } from "../../types";
import { nameFormatter } from "../../utils";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [, setLoading] = useState(true);

    const [showInactive] = useState(false);

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

    /* const handleToggleActive = async (id: string, currentState: boolean) => {
        const response = await activeUserToggle(id);
        if (response.success) {
            toast.success(`Usuario ${currentState ? "desactivado" : "activado"} exitosamente`);
            fetchUsers();
        }
    }; */

    const handleCreate = () => {
        window.location.href = `/users/create`;
    };

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">

                <Subtitle>Usuarios</Subtitle>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleCreate}
                >
                    Nuevo Admin
                </Button>

            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }}><strong>Avatar</strong></TableCell>
                            <TableCell sx={{ width: "15%", whiteSpace: "nowrap" }}><strong>Nombre</strong></TableCell>
                            <TableCell sx={{ width: "30%", whiteSpace: "nowrap" }} align="left"><strong>Rol</strong></TableCell>
                            <TableCell sx={{ width: "30%", whiteSpace: "nowrap" }}><strong>Correo</strong></TableCell>
                            {/* <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }} align="center">
                                <strong>Activo</strong>
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id} hover>
                                <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }}>
                                    <Avatar
                                        src={user.image}
                                        alt={nameFormatter(user)}
                                        sx={{ width: 48, height: 48 }}
                                    />
                                </TableCell>

                                <TableCell>{nameFormatter(user)}</TableCell>

                                <TableCell align="left">
                                    <Chip
                                        label={user.role === Role.ADMIN ? "Admin" : "Cliente"}
                                        color={user.role === Role.ADMIN ? "primary" : "default"}
                                        size="small"
                                    />
                                </TableCell>

                                <TableCell>{user.email}</TableCell>

                                {/* <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }} align="center">
                                    <Switch
                                        checked={user.active}
                                        onChange={() => handleToggleActive(user._id, user.active)}
                                        color="primary"
                                    />
                                </TableCell> */}


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*  <Box mt={2} display="flex" justifyContent="flex-end">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showInactive}
                            onChange={(e) => setShowInactive(e.target.checked)}
                        />
                    }
                    label="Mostrar inactivos"
                />
            </Box> */}
        </Box>
    );
}