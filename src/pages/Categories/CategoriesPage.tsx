import { Add, Delete, Edit } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
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
import { activeCategoryToggle, deleteCategory, getCategories } from "../../api/services";
import Subtitle from "../../Components/Subtitle";
import { confirmAlert } from "../../Components/SweetAlert";
import { Category } from "../../types";
import { getInitials } from "../../utils";

export default function CategoriesPage() {

    const [showInactive, setShowInactive] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const res = await getCategories();
            const categories = res.data;
            if (!showInactive) {
                const activeCategories = categories.filter((c: Category) => c.active);
                setCategories(activeCategories);
                return;
            }
            setCategories(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [showInactive]);

    const handleEdit = (id: string) => {
        window.location.href = `/categories/edit/${id}`;
    };

    const handleDelete = (id: string) => {
        confirmAlert("¿Estás seguro?", "Esta acción no se puede deshacer").then(async (confirmed) => {
            if (confirmed) {
                const response = await deleteCategory(id);
                if (response.success) {
                    toast.success("Categoría eliminada exitosamente");
                    fetchCategories();
                }
            }
        });
    };

    const handleCreate = () => {
        window.location.href = "/categories/create";
    };


    const handleToggleActive = async (id: string, currentState: boolean) => {
        const response = await activeCategoryToggle(id);
        if (response.success) {
            toast.success(`Categoría ${currentState ? "desactivada" : "activada"} exitosamente`);
            fetchCategories();
        }
    };

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">

                <Subtitle>
                    Categorías
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
                            <TableRow key={cat._id}>
                                <TableCell align="left">
                                    <Switch
                                        checked={cat.active}
                                        onChange={() =>
                                            handleToggleActive(cat._id, cat.active)
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
                                        <IconButton onClick={() => handleEdit(cat._id)}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Eliminar">
                                        <IconButton color="error" onClick={() => handleDelete(cat._id)}>
                                            <Delete />
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