import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import {
    Alert,
    Box,
    Button,
    Grid,
    IconButton,
    Tooltip,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import {
    getActiveServices,
    getInterestedServices,
    getUserProfile
} from "../../api/services";

import { Service, Subscription, SubscriptionStatus, UserProfile } from "../../types";
import {
    nameFormatter
} from "../../utils";

import EmptyState from "../../Components/EmptyState";
import Subtitle from "../../Components/Subtitle";
import ServiceCard from "../Services/ServiceCard";

import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from "react-router-dom";
import ProfileListener from "../../Components/ProfileListener/ProfileListener";

export default function ClientHomePage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [interestedServices, setInterestedServices] = useState<Service[]>([]);
    const [activeServices, setActiveServices] = useState<Service[]>([]);
    const [user, setUser] = useState<UserProfile | null>(null);

    const fetchUser = async () => {
        try {
            const res = await getUserProfile();
            setUser(res.data);
        } catch (error) {
            console.error(error);
        }
    };


    const fetchInterestedServices = async () => {
        setLoading(true);
        try {
            const res = await getInterestedServices();
            setInterestedServices(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchActiveServices = async () => {
        setLoading(true);
        try {
            const res = await getActiveServices();
            setActiveServices(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        Promise.all([fetchUser(), fetchInterestedServices(), fetchActiveServices()]);
    }, []);

    const userSubscriptions: Subscription[] = [];

    user?.subscriptions.forEach((subscription) => {
        const finded = userSubscriptions.find((s) => s.service._id === subscription.service._id);
        if (!finded) {
            userSubscriptions.push(subscription);
        }
    });

    if (!user) {
        return (
            <Box p={3}>
                <Typography variant="h6">
                    Por favor, inicia sesión para ver el contenido.
                </Typography>
            </Box>
        );
    }

    if (loading) {
        return (
            <Box sx={{ textAlign: "center", mt: 5 }}>
                <Typography>Cargando...</Typography>
            </Box>
        );
    }

    const hasInterestedServices = interestedServices.length;
    const servicesToShow = hasInterestedServices ? interestedServices : activeServices;

    const pendingPaymentsSubscriptions = user.subscriptions.filter((subscription) =>
        subscription.status === SubscriptionStatus.PENDING_PAYMENT
    );

    return (
        <Box p={3}>
            <Typography variant="h4" mb={2}>
                Bienvenido, {nameFormatter(user)}
            </Typography>

            {pendingPaymentsSubscriptions.length > 0 &&
                pendingPaymentsSubscriptions.map((subscription) => (
                    <Alert
                        severity="warning"
                        sx={{
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                        key={subscription._id}
                        action={
                            <Tooltip title="Ver servicio">
                                <IconButton
                                    color="inherit"
                                    size="small"
                                    onClick={() =>
                                        navigate(`/services/${subscription.service._id}`)
                                    }
                                >
                                    <LaunchIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                        }
                    >
                        Tu suscripción a{" "}
                        <strong>{subscription.service.name}</strong> está pendiente de pago.
                    </Alert>
                ))
            }

            <Subtitle>Mis suscripciones</Subtitle>

            {!userSubscriptions.length ? (
                <EmptyState
                    message="No tenés suscripciones activas."
                    buttonLabel="Explorar servicios"
                    buttonHref="/services/all"
                    icon={<VideoSettingsIcon />}
                />
            ) : (
                <Grid container spacing={3} justifyContent="center" alignItems="stretch">
                    {userSubscriptions.map((subscription) => (
                        <ServiceCard
                            key={subscription._id}
                            service={subscription.service}
                            isSubscribed={true}
                            subscriptionStatus={subscription.status}
                        />
                    ))}
                </Grid>

            )}

            <Subtitle>Servicios de tu interés</Subtitle>
            {!hasInterestedServices && (
                <Alert
                    severity="info"
                    sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                    action={
                        <Tooltip title="Ver servicio">
                            <IconButton
                                color="inherit"
                                size="small"
                                onClick={() =>
                                    navigate(`/profile`)
                                }
                            >
                                <LaunchIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    }
                >
                    No hay servicios marcados como de tu interés. Puedes agregar categorías a tu lista de interés desde tu perfil.
                </Alert>
            )}

            <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="stretch"
            >
                {servicesToShow.slice(0, 7).map((service) => {
                    const isSubscribed = user.subscriptions.some(
                        (subscription) => subscription.service._id === service._id
                    );

                    if (isSubscribed) return null;
                    return <ServiceCard key={service._id} service={service} isSubscribed={isSubscribed} />;
                })}
            </Grid>

            <Button
                sx={{ mt: 4, mx: "auto", display: "block" }}
                variant="contained"
                color="secondary"
                size="large"

                onClick={() => (window.location.href = "/services/all")}
            >
                Ver todos los servicios
            </Button>
            <ProfileListener userId={user._id} onMessage={async () => {
                fetchUser();
            }} />
        </Box>
    );
}