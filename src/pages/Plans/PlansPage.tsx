import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { activePlanToggle, deletePlan, getPlans } from "../../api/services";
import Subtitle from "../../Components/Subtitle";
import { confirmAlert } from "../../Components/SweetAlert";
import { Plan } from "../../types";
import { periodFormatter } from "../../utils";

export default function PlansPage() {
    const navigate = useNavigate();

    const [showInactive] = useState(false);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [, setLoading] = useState(true);

    const fetchPlans = async () => {
        try {
            const res = await getPlans();
            const plans = res.data;
            if (!showInactive) {
                const activePlans = plans.filter((p: Plan) => p.active);
                setPlans(activePlans);
                return;
            }
            setPlans(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, [showInactive]);

    const handleEdit = (id: string) => {
        navigate(`/plans/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        confirmAlert({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            onConfirm: async () => {
                const response = await deletePlan(id);
                if (response.success) {
                    toast.success("Plan eliminado exitosamente");
                    fetchPlans();
                } else {
                    toast.error(response.message || "Error al eliminar el plan");
                }
            }
        });
    };

    const handleCreate = () => {
        navigate("/plans/create");
    };

    const handleToggleActive = async (id: string, currentState: boolean) => {
        const response = await activePlanToggle(id);
        if (response.success) {
            toast.success(`Plan ${currentState ? "desactivado" : "activado"} exitosamente`);
            fetchPlans();
        }
    };

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Subtitle>
                    Planes
                </Subtitle>


                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                >
                    Nuevo Plan
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "10%", whiteSpace: "nowrap" }}><strong>Nombre</strong></TableCell>
                            <TableCell sx={{ width: "10%", whiteSpace: "nowrap" }} align="center"><strong>Período</strong></TableCell>
                            <TableCell sx={{ width: "10%", whiteSpace: "nowrap" }} align="center"><strong>Precio</strong></TableCell>
                            <TableCell sx={{ width: "10%", whiteSpace: "nowrap" }} align="center"><strong>Moneda</strong></TableCell>
                            <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }} align="center">
                                <strong>Activo</strong>
                            </TableCell>
                            <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }} align="center">
                                <strong>Acciones</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {plans.map((plan) => (
                            <TableRow key={plan._id}>
                                <TableCell >{plan.name}</TableCell>

                                <TableCell align="center">{periodFormatter(plan.period)}</TableCell>

                                <TableCell align="center">
                                    {plan.price.toLocaleString()}
                                </TableCell>

                                <TableCell align="center">{plan.currency}</TableCell>

                                <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }} align="center">
                                    <Switch
                                        checked={plan.active}
                                        onChange={() => handleToggleActive(plan._id!, plan.active)}
                                        color="primary"
                                    />
                                </TableCell>

                                <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }} align="center">
                                    <Tooltip title="Editar">
                                        <IconButton onClick={() => handleEdit(plan._id!)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Eliminar">
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(plan._id!)}
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