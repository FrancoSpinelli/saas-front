
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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteService, getServices } from "../../api/services";
import Subtitle from "../../Components/Subtitle";
import { confirmAlert } from "../../Components/SweetAlert";
import { Service } from "../../types";
import { periodFormatter } from "../../utils";

export default function ServicesPage() {
    const navigate = useNavigate();

    const [showInactive] = useState(false);
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
        navigate(`/services/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        confirmAlert({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            onConfirm: async () => {
                const response = await deleteService(id);
                if (response.success) {
                    toast.success("Servicio eliminado exitosamente");
                    fetchServices();
                } else {
                    toast.error(response.message || "Error al eliminar el servicio");
                }
            }
        });
    };

    const handleCreate = () => {
        navigate("/services/create");
    };

    /*  const handleToggleActive = async (id: string, currentState: boolean) => {
         const response = await activeServiceToggle(id);
         if (response.success) {
             toast.success(`Servicio ${currentState ? "desactivado" : "activado"} exitosamente`);
             fetchServices();
         }
     }; */
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
                            <TableCell><strong>Nombre</strong></TableCell>
                            <TableCell><strong>Descripción</strong></TableCell>
                            <TableCell align="center"><strong>Categoría</strong></TableCell>
                            <TableCell align="center"><strong>Planes</strong></TableCell>
                            {/* <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }} align="center">
                                <strong>Activo</strong>
                            </TableCell> */}
                            <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }} align="center">
                                <strong>Acciones</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {services.map((service) => (
                            <TableRow key={service._id}>

                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <strong>
                                            <a style={{ textDecoration: "underline", color: "inherit" }} href={`/services/${service._id}`}>
                                                {service.name}
                                            </a>
                                        </strong>
                                    </Box>
                                </TableCell>

                                <TableCell sx={{ maxWidth: 300 }}>
                                    {service.shortDescription}
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


                                {/* <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }} align="center">
                                    <Switch
                                        checked={service.active}
                                        onChange={() =>
                                            handleToggleActive(service._id, service.active)
                                        }
                                        color="primary"
                                    />
                                </TableCell> */}

                                <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }} align="center">
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
            {/* <Box mt={2} display="flex" justifyContent="flex-end">
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