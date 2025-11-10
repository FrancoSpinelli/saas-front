import { Add, Delete, Edit } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
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
import { getCategories } from "../api/services";
import Subtitle from "../Components/Subtitle";
import { Category } from "../types";
import { getInitials } from "../utils";

export default function CategoriesPage() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const res = await getCategories();
            setCategories(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleEdit = (id: string) => {
        console.log("Editar categoría:", id);
    };

    const handleDelete = (id: string) => {
        console.log("Eliminar categoría:", id);
    };

    const handleCreate = () => {
        console.log("Crear categoría");
    };

    const handleToggleActive = (id: string, currentState: boolean) => {
        console.log("Toggle categoría:", id, currentState);
    };

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">

                <Subtitle>
                    Categoría
                </Subtitle>

                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleCreate}
                >
                    Nueva Categoría
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><strong>Activo</strong></TableCell>
                            <TableCell><strong>Imagen</strong></TableCell>
                            <TableCell><strong>Nombre</strong></TableCell>
                            <TableCell><strong>Descripción</strong></TableCell>
                            <TableCell align="right"><strong>Acciones</strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {categories.map((cat) => (
                            <TableRow key={cat.id}>
                                <TableCell align="left">
                                    <Switch
                                        checked={cat.active}
                                        onChange={() =>
                                            handleToggleActive(cat.id, cat.active)
                                        }
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Avatar
                                        variant="rounded"
                                        src={cat.image || `https://placehold.co/100x100/png?text=${getInitials(cat.name, 2)}`}
                                        sx={{ width: 48, height: 48 }}
                                    />
                                </TableCell>

                                <TableCell>{cat.name}</TableCell>

                                <TableCell>{cat.description}</TableCell>

                                <TableCell align="right">
                                    <Tooltip title="Editar">
                                        <IconButton onClick={() => handleEdit(cat.id)}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Eliminar">
                                        <IconButton color="error" onClick={() => handleDelete(cat.id)}>
                                            <Delete />
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