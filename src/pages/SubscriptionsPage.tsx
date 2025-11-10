import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
    Avatar,
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import { useEffect, useState } from "react";
import { getSubscriptions } from "../api/services";
import Subtitle from "../Components/Subtitle";
import { Subscription } from "../types";
import { dateFormatter, getInitials } from "../utils";

export default function SubscriptionsPage() {

    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [, setLoading] = useState(true);

    const fetchSubscriptions = async () => {
        try {
            const res = await getSubscriptions();
            setSubscriptions(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const handleEdit = (id: string) => {
        console.log("Editar subscripción:", id);
    };

    const handleDelete = (id: string) => {
        console.log("Eliminar subscripción:", id);
    };


    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Subtitle>
                    Subscripciones
                </Subtitle>

            </Box>

            <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Cliente</strong></TableCell>
                            <TableCell><strong>Servicio</strong></TableCell>
                            <TableCell><strong>Plan</strong></TableCell>
                            <TableCell><strong>Fecha Inicio</strong></TableCell>
                            <TableCell><strong>Fecha Fin</strong></TableCell>
                            <TableCell align="right"><strong>Acciones</strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {subscriptions.map((subscription) => (
                            <TableRow key={subscription.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Avatar
                                            sx={{ width: 40, height: 40 }}
                                            src={
                                                subscription.client.image ||
                                                `https://placehold.co/100x100/png?text=${getInitials(subscription.client.firstName + " " + subscription.client.lastName, 2)}`
                                            }
                                        />
                                        {subscription.client.firstName} {subscription.client.lastName}
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Avatar
                                            variant="rounded"
                                            sx={{ width: 40, height: 40 }}
                                            src={
                                                subscription.service.image ||
                                                `https://placehold.co/100x100/png?text=${getInitials(subscription.service.name, 2)}`
                                            }
                                        />
                                        {subscription.service.name}
                                    </Box>
                                </TableCell>

                                <TableCell>{subscription.plan.name}</TableCell>

                                <TableCell>
                                    {dateFormatter(new Date(subscription.startDate))}
                                </TableCell>

                                <TableCell>
                                    {dateFormatter(new Date(subscription.endDate))}
                                </TableCell>

                                <TableCell align="right">
                                    <Tooltip title="Editar">
                                        <IconButton onClick={() => handleEdit(subscription.id)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Eliminar">
                                        <IconButton color="error" onClick={() => handleDelete(subscription.id)}>
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