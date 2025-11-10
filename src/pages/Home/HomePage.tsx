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

import {
    getPayments,
    getServices,
    getSubscriptions,
    getUserFromStorage,
} from "../../api/services";

import { Payment, Service, Subscription } from "../../types";
import {
    dateFormatter,
    nameFormatter,
    paymentMethodFormatter,
    periodFormatter,
} from "../../utils";

import Subtitle from "../../Components/Subtitle";

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
    };

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
                Bienvenido, {nameFormatter(currentUser)}
            </Typography>

            {subscriptions
                .filter(
                    (sub) =>
                        !sub.endDate || new Date(sub.endDate) < new Date()
                )
                .map((sub) => (
                    <Alert severity="warning" sx={{ mb: 2 }} key={sub._id}>
                        Tu suscripción a{" "}
                        <strong>{sub.service.name}</strong> está vencida o
                        impaga.
                    </Alert>
                ))}

            <Subtitle>Servicios</Subtitle>

            <Grid container spacing={2}>
                {services.map((service) => (
                    <Grid key={service._id} sx={{ width: 600 }}>
                        <Card
                            sx={{
                                borderRadius: 3,
                                p: 1,
                                boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
                                transition: "0.25s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow:
                                        "0px 6px 20px rgba(0,0,0,0.12)",
                                },
                            }}
                        >
                            <CardContent>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <Avatar
                                        src={service.image}
                                        alt={service.name}
                                        sx={{ width: 48, height: 48 }}
                                    />
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            {service.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {service.description}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    flexWrap="wrap"
                                    my={2}
                                >
                                    {service.plans.map((plan) => (
                                        <Tooltip
                                            key={plan._id}
                                            title={`${plan.name}: ${plan.price} ${plan.currency}`}
                                        >
                                            <Chip
                                                label={periodFormatter(
                                                    plan.period
                                                )}
                                                sx={{ fontSize: "0.75rem" }}
                                            />
                                        </Tooltip>
                                    ))}
                                </Stack>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Categoría: {service.category.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Subtitle>Suscripciones</Subtitle>

            <Grid container spacing={2}>
                {subscriptions.map((sub) => (
                    <Grid key={sub._id} sx={{ width: 600 }}>
                        <Card
                            sx={{
                                borderRadius: 3,
                                p: 1,
                                boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
                                transition: "0.25s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow:
                                        "0px 6px 20px rgba(0,0,0,0.12)",
                                },
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                >
                                    {sub.service.name}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Plan: {periodFormatter(sub.plan.period)} —{" "}
                                    {sub.plan.price} {sub.plan.currency}
                                </Typography>

                                <Typography variant="body2" mt={1}>
                                    <strong>Cliente:</strong>{" "}
                                    {nameFormatter(sub.client)}
                                </Typography>

                                <Typography variant="body2">
                                    <strong>Inicio:</strong>{" "}
                                    {dateFormatter(sub.startDate)}
                                </Typography>

                                <Typography variant="body2">
                                    <strong>Fin:</strong>{" "}
                                    {dateFormatter(sub.endDate)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Subtitle>Últimos Pagos</Subtitle>

            <Grid container spacing={2}>
                {payments.slice(0, 5).map((payment) => (
                    <Grid key={payment._id} sx={{ width: 600 }}>
                        <Card
                            sx={{
                                borderRadius: 3,
                                p: 1,
                                boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
                                transition: "0.25s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow:
                                        "0px 6px 20px rgba(0,0,0,0.12)",
                                },
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600 }}
                                    gutterBottom
                                >
                                    {payment.subscription.service.name}
                                </Typography>

                                <Typography variant="body2">
                                    <strong>Cliente:</strong>{" "}
                                    {
                                        payment.subscription.client
                                            .firstName
                                    }{" "}
                                    {
                                        payment.subscription.client
                                            .lastName
                                    }
                                </Typography>

                                <Typography variant="body2">
                                    <strong>Monto:</strong>{" "}
                                    {payment.plan.price}{" "}
                                    {payment.plan.currency}
                                </Typography>

                                <Typography variant="body2">
                                    <strong>Método:</strong>{" "}
                                    {paymentMethodFormatter(
                                        payment.method
                                    )}
                                </Typography>

                                <Typography variant="body2">
                                    <strong>Fecha de pago:</strong>{" "}
                                    {new Date(
                                        payment.paidAt
                                    ).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}