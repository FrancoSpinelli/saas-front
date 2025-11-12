import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import {
    getServices,
    getSubscriptions,
    getUserFromStorage,
} from "../../api/services";

import { Service, Subscription } from "../../types";
import {
    dateFormatter,
    nameFormatter,
    periodFormatter,
} from "../../utils";

import EmptyState from "../../Components/EmptyState";
import Subtitle from "../../Components/Subtitle";
import ServiceCard from "../Services/ServiceCard";

export default function ClientHomePage() {
    const [loading, setLoading] = useState(true);

    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [services, setServices] = useState<Service[]>([]);

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

    const fetchData = async () => {
        try {
            const [servicesRes, subsRes] = await Promise.all([
                getServices(),
                getSubscriptions(),
            ]);

            setServices(servicesRes.data);
            setSubscriptions(subsRes.data.filter(
                (s: Subscription) => s.client._id === currentUser._id
            ));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ textAlign: "center", mt: 5 }}>
                <Typography>Cargando...</Typography>
            </Box>
        );
    }

    const myServiceIds = subscriptions.map((s) => s.service._id);

    return (
        <Box p={3}>
            <Typography variant="h4" mb={2}>
                Hola, {nameFormatter(currentUser)} 👋
            </Typography>

            {subscriptions
                .filter((subscription) => subscription.endDate && new Date(subscription.endDate) < new Date())
                .map((subscription) => (
                    <Alert severity="warning" sx={{ mb: 2 }} key={subscription._id}>
                        Tu suscripción a <strong>{subscription.service.name}</strong> está vencida.
                    </Alert>
                ))}

            <Subtitle>Mis suscripciones</Subtitle>

            {!subscriptions.length ? (
                <EmptyState
                    message="No tenés suscripciones activas."
                    buttonLabel="Explorar servicios"
                    buttonHref="/services/all"
                    icon={<VideoSettingsIcon />}
                />
            ) : (
                <Grid container spacing={2} mb={4}>
                    {subscriptions.map((subscription) => (
                        <Grid key={subscription._id}>
                            <Card
                                sx={{
                                    borderRadius: 3,
                                    p: 1,
                                    height: "100%",
                                    cursor: "pointer",
                                    transition: "0.25s",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: "0px 6px 20px rgba(0,0,0,0.12)",
                                    },
                                }}
                            >
                                <CardContent>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar
                                            src={subscription.service.image}
                                            alt={subscription.service.name}
                                            sx={{ width: 48, height: 48 }}
                                        />
                                        <Box>
                                            <Typography variant="h6">
                                                {subscription.service.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {subscription.plan.price} {subscription.plan.currency} •{" "}
                                                {periodFormatter(subscription.plan.period)}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Typography variant="body2" mt={2}>
                                        <strong>Inicio:</strong>{" "}
                                        {dateFormatter(subscription.startDate)}
                                    </Typography>

                                    <Typography variant="body2">
                                        <strong>Fin:</strong>{" "}
                                        {dateFormatter(subscription.endDate)}
                                    </Typography>

                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        onClick={() => (window.location.href = `/services/${subscription.service._id}`)}
                                    >
                                        Ver detalles
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Subtitle>Servicios que te pueden interesar</Subtitle>

            <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="stretch"
            >
                {services.map((service) => {
                    const isSubscribed = myServiceIds.includes(service._id);
                    return <ServiceCard key={service._id} service={service} isSubscribed={isSubscribed} />;
                })}
            </Grid>
        </Box >
    );
}