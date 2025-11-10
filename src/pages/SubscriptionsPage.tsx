import {
    Avatar,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { useEffect, useState } from "react";
import { getSubscriptions } from "../api/services";
import Subtitle from "../Components/Subtitle";
import { Subscription } from "../types";
import { dateFormatter, getInitials, nameFormatter } from "../utils";

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
                            <TableCell align="center"><strong>Desde</strong></TableCell>
                            <TableCell align="center"><strong>Hasta</strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {subscriptions.map((subscription) => (
                            <TableRow key={subscription._id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Avatar
                                            sx={{ width: 40, height: 40 }}
                                            src={subscription.client.image}
                                        />
                                        {nameFormatter(subscription.client)}
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

                                <TableCell align="center">
                                    {dateFormatter(new Date(subscription.startDate))}
                                </TableCell>

                                <TableCell align="center">
                                    {dateFormatter(new Date(subscription.endDate))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </Box>
    );
}