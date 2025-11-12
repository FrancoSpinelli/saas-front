import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import {
    Avatar,
    Box,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { useEffect, useState } from "react";
import { getSubscriptions } from "../../api/services";
import EmptyState from "../../Components/EmptyState";
import Subtitle from "../../Components/Subtitle";
import { Subscription } from "../../types";
import { dateFormatter, getInitials, nameFormatter, periodFormatter, subscriptionStatusColorsFormatter, subscriptionStatusFormatter } from "../../utils";


const AdminView = ({ subscriptions }: { subscriptions: Subscription[] }) =>
    <Box p={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Subtitle>
                Suscripciones
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
    ;

const ClientView = ({ subscriptions }: { subscriptions: Subscription[] }) => {
    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Subtitle>
                    Mis Suscripciones
                </Subtitle>

            </Box>

            {!subscriptions.length ?
                <EmptyState
                    message="No tenés suscripciones activas."
                    buttonLabel="Explorar servicios"
                    buttonHref="/services/all"
                    icon={<VideoSettingsIcon />}
                />
                :

                <TableContainer component={Paper} sx={{ mt: 1 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Servicio</strong></TableCell>
                                <TableCell align="center"><strong>Plan</strong></TableCell>
                                <TableCell align="center"><strong>Periodo</strong></TableCell>
                                <TableCell align="center"><strong>Precio</strong></TableCell>
                                <TableCell align="center"><strong>Desde</strong></TableCell>
                                <TableCell align="center"><strong>Vencimiento</strong></TableCell>
                                <TableCell align="center"><strong>Último pago</strong></TableCell>
                                <TableCell align="center"><strong>Estado</strong></TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {subscriptions.map((subscription) => (
                                <TableRow key={subscription._id}>
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

                                    <TableCell align="center">{subscription.plan.name}</TableCell>

                                    <TableCell align="center">{periodFormatter(subscription.plan.period)}</TableCell>

                                    <TableCell align="center">{subscription.plan.price} {subscription.plan.currency}</TableCell>

                                    <TableCell align="center">
                                        {dateFormatter(new Date(subscription.startDate))}
                                    </TableCell>

                                    <TableCell align="center">
                                        {dateFormatter(new Date(subscription.endDate))}
                                    </TableCell>

                                    <TableCell align="center">
                                        {
                                            subscription.lastPaymentDate ? dateFormatter(new Date(subscription.lastPaymentDate)) : "-"
                                        }
                                    </TableCell>

                                    <TableCell align="center">
                                        <Chip
                                            color={
                                                subscriptionStatusColorsFormatter(subscription.status)
                                            }
                                            label={subscriptionStatusFormatter(subscription.status)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            }
        </Box>
    );
};
interface SubscriptionProps {
    userId?: string;
    isAdmin?: boolean;
}

export default function SubscriptionsPage({ userId, isAdmin }: SubscriptionProps) {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [, setLoading] = useState(true);


    const fetchSubscriptions = async () => {
        try {
            const res = await getSubscriptions(!isAdmin ? userId : undefined);
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

    if (!isAdmin) {
        return <ClientView subscriptions={subscriptions} />;
    }
    return <AdminView subscriptions={subscriptions} />;
}