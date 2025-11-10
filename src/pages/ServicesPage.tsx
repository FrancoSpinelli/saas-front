
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
    Box,
    Button,
    Chip,
    IconButton,
    Paper,
    Stack,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";


import { useEffect, useState } from "react";
import { getServices } from "../api/services";
import { Service } from "../types";
import { periodFormatter } from "../utils";

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        try {
            const res = await getServices();
            setServices(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);


    const handleEdit = (id: string) => {
        console.log("Editar servicio:", id);
    };

    const handleDelete = (id: string) => {
        console.log("Eliminar servicio:", id);
    };

    const handleCreate = () => {
        console.log("Crear servicio");
    };

    const handleToggleActive = (id: string, currentState: boolean) => {
        console.log("Toggle servicio:", id, currentState);
    };

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" fontWeight="bold">
                    Servicios
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                >
                    Nuevo Servicio
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><strong>Activo</strong></TableCell>
                            <TableCell align="center"><strong>Autor</strong></TableCell>
                            <TableCell><strong>Nombre</strong></TableCell>
                            <TableCell><strong>Descripción</strong></TableCell>
                            <TableCell align="center"><strong>Categoría</strong></TableCell>
                            <TableCell align="center"><strong>Planes</strong></TableCell>
                            <TableCell align="right"><strong>Acciones</strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {services.map((svc) => (
                            <TableRow key={svc.id}>

                                <TableCell align="left">
                                    <Switch
                                        checked={svc.active}
                                        onChange={() =>
                                            handleToggleActive(svc.id, svc.active)
                                        }
                                        color="primary"
                                    />
                                </TableCell>

                                <TableCell align="center">
                                    {svc.owner.firstName} {svc.owner.lastName}
                                </TableCell>

                                <TableCell>{svc.name}</TableCell>

                                <TableCell sx={{ maxWidth: 300 }}>
                                    {svc.description}
                                </TableCell>

                                <TableCell align="center">
                                    <Chip label={svc.category.name} color="primary" />
                                </TableCell>

                                <TableCell align="center">
                                    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
                                        {svc.plans.map((p) => (
                                            <Tooltip key={p.id} title={`${p.price} ${p.currency}`}>
                                                <Chip label={periodFormatter(p.period)} />
                                            </Tooltip>
                                        ))}
                                    </Stack>
                                </TableCell>



                                <TableCell align="right">
                                    <Tooltip title="Editar">
                                        <IconButton onClick={() => handleEdit(svc.id)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Eliminar">
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(svc.id)}
                                        >
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