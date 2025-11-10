import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
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
import { activePlanToggle, getPlans } from "../../api/services";
import Subtitle from "../../Components/Subtitle";
import { Plan } from "../../types";
import { periodFormatter } from "../../utils";

export default function PlansPage() {

    const [showInactive, setShowInactive] = useState(false);
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
        console.log("Editar plan:", id);
    };

    const handleDelete = (id: string) => {
        console.log("Eliminar plan:", id);
    };

    const handleCreate = () => {
        console.log("Crear plan");
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
                            <TableCell><strong>Activo</strong></TableCell>
                            <TableCell><strong>Nombre</strong></TableCell>
                            <TableCell align="center"><strong>Período</strong></TableCell>
                            <TableCell align="center"><strong>Precio</strong></TableCell>
                            <TableCell align="center"><strong>Moneda</strong></TableCell>
                            <TableCell align="right"><strong>Acciones</strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {plans.map((plan) => (
                            <TableRow key={plan._id}>

                                <TableCell>
                                    <Switch
                                        checked={plan.active}
                                        onChange={() => handleToggleActive(plan._id!, plan.active)}
                                        color="primary"
                                    />
                                </TableCell>


                                <TableCell>{plan.name}</TableCell>

                                <TableCell align="center">{periodFormatter(plan.period)}</TableCell>

                                <TableCell align="center">
                                    {plan.price.toLocaleString()}
                                </TableCell>

                                <TableCell align="center">{plan.currency}</TableCell>

                                <TableCell align="right">
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