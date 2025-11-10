
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
    Tooltip
} from "@mui/material";


import { useEffect, useState } from "react";
import { getServices } from "../api/services";
import Subtitle from "../Components/Subtitle";
import { Service } from "../types";
import { periodFormatter } from "../utils";

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [, setLoading] = useState(true);

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
                <Subtitle>
                    Servicios
                </Subtitle>


                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                >
                    Nuevo Servicio
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ mt: 1 }}>
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
                        {services.map((service) => (
                            <TableRow key={service.id}>

                                <TableCell align="left">
                                    <Switch
                                        checked={service.active}
                                        onChange={() =>
                                            handleToggleActive(service.id, service.active)
                                        }
                                        color="primary"
                                    />
                                </TableCell>

                                <TableCell align="center">
                                    {service.owner.firstName} {service.owner.lastName}
                                </TableCell>

                                <TableCell>{service.name}</TableCell>

                                <TableCell sx={{ maxWidth: 300 }}>
                                    {service.description}
                                </TableCell>

                                <TableCell align="center">
                                    <Chip label={service.category.name} color="primary" />
                                </TableCell>

                                <TableCell align="center">
                                    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
                                        {service.plans.map((p) => (
                                            <Tooltip key={p.id} title={`${p.name}: ${p.price} ${p.currency}`}>
                                                <Chip label={periodFormatter(p.period)} />
                                            </Tooltip>
                                        ))}
                                    </Stack>
                                </TableCell>

                                <TableCell align="right">
                                    <Tooltip title="Editar">
                                        <IconButton onClick={() => handleEdit(service.id)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Eliminar">
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(service.id)}
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