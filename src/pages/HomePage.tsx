import {
    Alert,
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { getPayments, getServices, getSubscriptions, getUserFromStorage } from "../api/services";
import Subtitle from "../Components/Subtitle";
import { Payment, Service, Subscription } from "../types";
import { dateFormatter, paymentMethodFormatter, periodFormatter } from "../utils";

export default function HomePage() {

    const [loading, setLoading] = useState(true);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);

    const currentUser = getUserFromStorage();

    if (!currentUser) {
        return (
            <Box p={3}>
                <Typography variant="h6">
                    Por favor, inicia sesión para ver el contenido.
                </Typography>
            </Box>
        );
    }

    const fetchServices = async () => {
        try {
            const res = await getServices();
            setServices(res.data);
        } catch (error) {
            console.error(error);
        }
    };


    const fetchSubscriptions = async () => {
        try {
            const res = await getSubscriptions();
            setSubscriptions(res.data);
        } catch (error) {
            console.error(error);
        }
    }


    const fetchPayments = async () => {
        try {
            const res = await getPayments();
            setPayments(res.data);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        Promise.all([
            fetchServices(),
            fetchSubscriptions(),
            fetchPayments(),
        ]).finally(() => setLoading(false));
    }, []);


    if (loading) {
        return (
            <Box sx={{ textAlign: "center", mt: 5 }}>
                <Typography>Cargando...</Typography>
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Typography variant="h4" mb={2}>
                Bienvenido, {currentUser.firstName} {currentUser.lastName}
            </Typography>

            {subscriptions
                .filter((sub) => !sub.endDate || new Date(sub.endDate) < new Date())
                .map((sub) => (
                    <Alert severity="warning" sx={{ mb: 2 }} key={sub.id}>
                        Tu suscripción a <strong>{sub.service.name}</strong> está vencida o impaga.
                    </Alert>
                ))}

            <Subtitle>
                Servicios
            </Subtitle>

            <Grid container spacing={2}>
                {services.map((service) => (
                    <Grid key={service.id} sx={{ width: 600 }}>
                        <Card>
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar
                                        src={service.category.image}
                                        alt={service.category.name}
                                        sx={{ width: 48, height: 48 }}
                                    />
                                    <Box>
                                        <Typography variant="h6">{service.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {service.description}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap" my={2}>
                                        {service.plans.map((p) => (
                                            <Tooltip key={p.id} title={`${p.name}: ${p.price} ${p.currency}`}>
                                                <Chip label={periodFormatter(p.period)} />
                                            </Tooltip>
                                        ))}
                                    </Stack>
                                </Typography>

                                <Typography variant="caption" color="text.secondary">
                                    Categoría: {service.category.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Subtitle>
                Suscripciones
            </Subtitle>

            <Grid container spacing={2}>
                {subscriptions.map((subscriptions) => (
                    <Grid key={subscriptions.id} sx={{ width: 600 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    {subscriptions.service.name}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Plan: {periodFormatter(subscriptions.plan.period)} — ${subscriptions.plan.price} {subscriptions.plan.currency}
                                </Typography>

                                <Typography variant="body2" mt={1}>
                                    <strong>Inicio:</strong> {dateFormatter(subscriptions.startDate)}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Fin:</strong> {dateFormatter(subscriptions.endDate)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Subtitle>
                Últimos Pagos
            </Subtitle>

            <Grid container spacing={2}>
                {payments
                    .slice(0, 5)
                    .map((payment) => (
                        <Grid key={payment.id} sx={{ width: 600 }}>
                            <Card sx={{ height: "100%" }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {payment.subscription.service.name}
                                    </Typography>

                                    <Typography variant="body2">
                                        <strong>Cliente:</strong> {payment.subscription.client.firstName} {payment.subscription.client.lastName}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Monto:</strong> ${payment.plan.price} {payment.plan.currency}
                                    </Typography>

                                    <Typography variant="body2">
                                        <strong>Método:</strong> {paymentMethodFormatter(payment.method)}
                                    </Typography>

                                    <Typography variant="body2">
                                        <strong>Fecha de pago:</strong> {new Date(payment.paidAt).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
}