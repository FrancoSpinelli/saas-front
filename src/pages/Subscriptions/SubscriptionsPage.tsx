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
import { getSubscriptions, getUserProfile } from "../../api/services";
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
                        <TableCell><strong>Servicio</strong></TableCell>
                        <TableCell><strong>Cliente</strong></TableCell>
                        <TableCell><strong>Plan</strong></TableCell>
                        <TableCell align="center"><strong>Desde</strong></TableCell>
                        <TableCell align="center"><strong>Hasta</strong></TableCell>
                        <TableCell align="center"><strong>Estado</strong></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {subscriptions.map((subscription) => (
                        <TableRow key={subscription._id}>
                            <TableCell>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <strong>
                                        <a style={{ textDecoration: "underline", color: "inherit" }} href={`/services/${subscription.service._id}`}>
                                            {subscription.service.name}
                                        </a>
                                    </strong>
                                </Box>
                            </TableCell>

                            <TableCell>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Avatar
                                        sx={{ width: 40, height: 40 }}
                                        src={subscription.client.image}
                                    />
                                    {nameFormatter(subscription.client)}
                                </Box>
                            </TableCell>

                            <TableCell>{subscription.plan.name}</TableCell>

                            <TableCell align="center">
                                {dateFormatter(new Date(subscription.startDate))}
                            </TableCell>

                            <TableCell align="center">
                                {dateFormatter(new Date(subscription.endDate))}
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
                                <TableCell align="center"><strong>Categoría</strong></TableCell>
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
                                            <strong>
                                                <a style={{ textDecoration: "underline", color: "inherit" }} href={`/services/${subscription.service._id}`}>
                                                    {subscription.service.name}
                                                </a>
                                            </strong>
                                        </Box>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Chip label={subscription.service.category.name} color="secondary" />
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

export default function SubscriptionsPage({ isAdmin }: SubscriptionProps) {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [, setLoading] = useState(true);


    const fetchUserProfile = async () => {
        try {
            if (isAdmin) {
                const res = await getSubscriptions();
                setSubscriptions(res.data);
            } else {
                const res = await getUserProfile();
                setSubscriptions(res.data.subscriptions);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    if (!isAdmin) {
        return <ClientView subscriptions={subscriptions} />;
    }
    return <AdminView subscriptions={subscriptions} />;
}