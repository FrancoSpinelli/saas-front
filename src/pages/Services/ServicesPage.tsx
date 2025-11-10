
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
    Box,
    Button,
    Checkbox,
    Chip,
    FormControlLabel,
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
import { toast } from "react-toastify";
import Subtitle from "../../Components/Subtitle";
import { Service } from "../../types";
import { nameFormatter, periodFormatter } from "../../utils";
import { activeServiceToggle, getServices } from "../../api/services";

export default function ServicesPage() {
    const [showInactive, setShowInactive] = useState(false);
    const [services, setServices] = useState<Service[]>([]);
    const [, setLoading] = useState(true);


    const fetchServices = async () => {
        try {
            const res = await getServices();
            const services = res.data;
            if (!showInactive) {
                const activeServices = services.filter((s: Service) => s.active);
                setServices(activeServices);
                return;
            }
            setServices(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, [showInactive]);


    const handleEdit = (id: string) => {
        console.log("Editar servicio:", id);
    };

    const handleDelete = (id: string) => {
        console.log("Eliminar servicio:", id);
    };

    const handleCreate = () => {
        console.log("Crear servicio");
    };

    const handleToggleActive = async (id: string, currentState: boolean) => {
        const response = await activeServiceToggle(id);
        if (response.success) {
            toast.success(`Servicio ${currentState ? "desactivado" : "activado"} exitosamente`);
            fetchServices();
        }
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
                            <TableRow key={service._id}>

                                <TableCell align="left">
                                    <Switch
                                        checked={service.active}
                                        onChange={() =>
                                            handleToggleActive(service._id, service.active)
                                        }
                                        color="primary"
                                    />
                                </TableCell>

                                <TableCell align="center">
                                    {nameFormatter(service.owner)}
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
                                            <Tooltip key={p._id} title={`${p.name}: ${p.price} ${p.currency}`}>
                                                <Chip label={periodFormatter(p.period)} />
                                            </Tooltip>
                                        ))}
                                    </Stack>
                                </TableCell>

                                <TableCell align="right">
                                    <Tooltip title="Editar">
                                        <IconButton onClick={() => handleEdit(service._id)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Eliminar">
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(service._id)}
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