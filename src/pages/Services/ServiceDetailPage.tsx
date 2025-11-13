import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cancelSubscription, createSubscription, getServiceById, getUserProfile, renewSubscription } from "../../api/services";
import { Role, Service, SubscriptionStatus, UserProfile } from "../../types";
import { dateFormatter, periodFormatter } from "../../utils";

import { LockOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import { confirmAlert } from "../../Components/SweetAlert";
import SubscriptionDetailsCard from "../Subscriptions/SubscriptionDetailsCard";

export default function ServiceDetailPage() {
    const { id } = useParams();
    const [service, setService] = useState<Service | null>(null);
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);


    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const isAdmin = currentUser?.role === Role.ADMIN;


    const fetchService = async () => {
        try {
            const res = await getServiceById(id!);
            setService(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const res = await getUserProfile();
            setCurrentUser(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        try {
            fetchService();
            fetchUserProfile();
        } catch (error) {
            console.error(error);
        }
    }, [id]);

    if (!service) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <Typography>Cargando servicio...</Typography>
            </Box>
        );
    }

    if (!currentUser) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <Typography>Cargando usuario...</Typography>
            </Box>
        );
    }

    const clientSubscription = currentUser.subscriptions.find(sub =>
        sub.service._id === service._id);
    const isSuscribedClient = Boolean(clientSubscription);
    const isPendingPayment = clientSubscription?.status === SubscriptionStatus.PENDING_PAYMENT;


    const handleCancelSubscription = () => {
        confirmAlert({
            title: "¿Estás seguro?",
            text: `Podras reactivar la suscripción en cualquier momento. Podras disfrutar del servicio hasta el ${dateFormatter(clientSubscription!.endDate)}`,
            cancelButtonText: "Volver",
            onConfirm: async () => {
                const response = await cancelSubscription(clientSubscription!._id);
                if (response.success) {
                    toast.success("Suscripción cancelada exitosamente")
                    fetchUserProfile();
                }
            }
        });
    }



    const handleCreateSubscription = async () => {

        const subscriptionData = {
            serviceId: service._id,
            planId: selectedPlan!,
        };
        try {
            let response;
            if (isSuscribedClient) {
                response = await renewSubscription(clientSubscription!._id);
            } else {
                response = await createSubscription(subscriptionData);
            }

            if (response.success) {
                toast.success(`Suscripción ${isSuscribedClient ? "renovada" : "creada"} con éxito`);
                fetchUserProfile();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Error al iniciar sesión", {
                autoClose: 1000,
            });
        }
    }

    const handlePlanSelect = (planId: string) => {
        setSelectedPlan(planId);
    }


    const views = {
        lockContent: !isAdmin && (!isSuscribedClient || isPendingPayment),
        unLockContent: isAdmin || (isSuscribedClient && !isPendingPayment),
        selectPlan: !isSuscribedClient && !isAdmin,
        availablePlans: isAdmin,
        subscribeButton: !isSuscribedClient && !isAdmin,
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            minHeight="100vh"
            p={3}
        >
            <Grid
                container
                spacing={6}
                justifyContent="center"
                alignItems="flex-start"
            >
                <Grid maxWidth={800}>
                    <Card
                        sx={{
                            borderRadius: 3,
                            p: 2,
                            pb: 0,
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                        }}
                    >
                        <CardContent sx={{ p: 0 }}>
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: 260,
                                    borderRadius: 3,
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                    }}
                                />

                                <Chip
                                    label={service.category.name}
                                    color="secondary"
                                    size="small"
                                    sx={{
                                        position: "absolute",
                                        bottom: 10,
                                        right: 10,
                                        color: "white",
                                        fontWeight: 600,
                                        fontSize: "1rem",
                                        p: 2,
                                    }}
                                />
                            </Box>

                            <Box p={3} pb={0}>
                                <Typography variant="h4" fontWeight={700}>
                                    {service.name}
                                </Typography>

                                {service.shortDescription && (
                                    <Typography
                                        variant="subtitle1"
                                        color="text.secondary"
                                        mt={1}
                                    >
                                        {service.shortDescription}
                                    </Typography>
                                )}

                                <Divider sx={{ my: 3 }} />

                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 1 }}>
                                    <Avatar
                                        src={service.owner.image}
                                        alt={`${service.owner.firstName} ${service.owner.lastName}`}
                                        sx={{
                                            width: 50,
                                            height: 50,
                                        }}
                                    />

                                    <Box>
                                        <Typography variant="body1" fontWeight={600}>
                                            {service.owner.firstName} {service.owner.lastName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Autor
                                        </Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="h6" fontWeight={600}>
                                    Descripción
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    mt={1}
                                    whiteSpace="pre-line"
                                >
                                    {service.longDescription}
                                </Typography>

                                {views.lockContent && (
                                    <>
                                        <Divider sx={{ my: 3 }} />
                                        <Box
                                            sx={{
                                                my: 2,
                                                p: 4,
                                                textAlign: "center",
                                                borderRadius: 3,
                                                bgcolor: "grey.100",
                                                color: "text.secondary",
                                                border: "2px dashed rgba(0,0,0,0.2)",
                                            }}
                                        >
                                            <LockOutlined sx={{ fontSize: 40, mb: 1, color: "text.secondary" }} />
                                            <Typography variant="h6" fontWeight={600}>
                                                Contenido bloqueado 🔒
                                            </Typography>
                                            <Typography variant="body2" mt={1}>
                                                Suscribite para acceder al contenido completo del servicio.
                                            </Typography>
                                        </Box>
                                    </>
                                )}


                                {views.selectPlan && (
                                    <>
                                        <Divider sx={{ my: 3 }} />
                                        <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
                                            <Typography variant="h6" fontWeight={600}>
                                                Seleccione un plan:
                                            </Typography>

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                flexWrap="wrap"
                                                my={2}
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                {service.plans.map((plan) => {
                                                    const isSelected = selectedPlan === plan._id;

                                                    return (
                                                        <Chip
                                                            key={plan._id}
                                                            label={`${periodFormatter(plan.period)}: ${plan.price} ${plan.currency}`}
                                                            clickable
                                                            color={isSelected ? "success" : "default"}
                                                            variant={isSelected ? "filled" : "outlined"}
                                                            onClick={() => handlePlanSelect(plan._id)}
                                                            sx={{
                                                                p: 1,
                                                                borderRadius: 2,
                                                                fontSize: "0.85rem",
                                                                borderWidth: isSelected ? 2 : 1,
                                                                borderColor: isSelected ? "success.main" : "rgba(0,0,0,0.12)",
                                                                fontWeight: isSelected ? 600 : 400,
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </Stack>
                                        </Box>
                                    </>
                                )}


                                {views.availablePlans && (
                                    <>
                                        <Divider sx={{ my: 3 }} />
                                        <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>

                                            <Typography variant="h6" fontWeight={600}>
                                                Planes disponibles:
                                            </Typography>

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                flexWrap="wrap"
                                                my={2}
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                {service.plans.map((plan) => (
                                                    <Chip
                                                        key={plan._id}
                                                        label={`${periodFormatter(plan.period)}: ${plan.price} ${plan.currency}`}
                                                        sx={{
                                                            p: 1,
                                                            borderRadius: 2,
                                                            fontSize: "0.85rem",
                                                        }}
                                                    />
                                                ))}
                                            </Stack>
                                        </Box>
                                    </>
                                )}


                                {views.subscribeButton && (
                                    <>
                                        <Divider sx={{ my: 3 }} />

                                        <Button
                                            variant="contained"
                                            size="large"
                                            color="success"
                                            disabled={!selectedPlan}
                                            sx={{
                                                mt: 4,
                                                borderRadius: 2,
                                                mx: "auto",
                                                display: "block",

                                            }}
                                            onClick={handleCreateSubscription}
                                        >
                                            Suscribirme
                                        </Button>
                                    </>
                                )}

                                {views.unLockContent && (
                                    <>
                                        <Divider sx={{ my: 3 }} />
                                        <Box
                                            sx={{
                                                p: 4,
                                                my: 2,
                                                textAlign: "center",
                                                borderRadius: 3,
                                                bgcolor: "InfoBackground",
                                                color: "text.secondary",
                                                boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
                                            }}
                                        >
                                            <Typography variant="h6" fontWeight={600}>
                                                Contenido desbloqueado ✅
                                            </Typography>
                                            <Typography variant="body2" mt={1}>
                                                Gracias por suscribirte.
                                            </Typography>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                {clientSubscription && <SubscriptionDetailsCard subscription={clientSubscription} onCancel={handleCancelSubscription} onRenew={handleCreateSubscription} />}
            </Grid>
        </Box >
    );
}