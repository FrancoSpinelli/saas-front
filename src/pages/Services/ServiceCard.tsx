import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { getUserProfile } from "../../api/services";
import { useFetch } from '../../hooks/useFetch';
import { Role, Service, SubscriptionStatus } from "../../types";
import { periodFormatter, subscriptionStatusColorsFormatter, subscriptionStatusFormatter } from "../../utils";

interface ServiceCardProps {
    service: Service;
    subscriptionStatus?: SubscriptionStatus;
    isSubscribed?: boolean;
    clientsCount?: number;
}
export default function ServiceCard({ service, subscriptionStatus, isSubscribed = false, clientsCount = 0 }: ServiceCardProps) {
    const { data: user, loading } = useFetch(getUserProfile);

    const isAdmin = user?.role === Role.ADMIN;

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <Grid
            key={service._id}
            display="flex"
            justifyContent="center"
        >
            <Card
                sx={{
                    borderRadius: 3,
                    p: 1,
                    width: 420,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    transition: "0.25s",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0px 6px 20px rgba(0,0,0,0.12)",
                    },
                    pb: 0,
                }}
            >
                <CardContent sx={{ p: 0, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: 160,
                            borderRadius: 2,
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
                            }}
                        />
                        {subscriptionStatus ? <Chip
                            label={subscriptionStatusFormatter(subscriptionStatus)}
                            color={subscriptionStatusColorsFormatter(subscriptionStatus)}
                            size="small"
                            sx={{
                                position: "absolute",
                                bottom: 8,
                                right: 8,
                                color: "white",
                                fontWeight: 600,
                            }}
                        /> : (
                            <Chip
                                label={service.category.name}
                                color="secondary"
                                size="small"
                                sx={{
                                    position: "absolute",
                                    bottom: 8,
                                    right: 8,
                                    color: "white",
                                    fontWeight: 600,
                                }}
                            />
                        )}
                    </Box>

                    <Box p={2} sx={{ flexGrow: 1, display: "flex", flexDirection: "column", pb: 0 }}>
                        <Typography
                            variant="h5"
                            fontWeight={600}
                            sx={{
                                minHeight: "3em",
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            {service.name}
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                mt: 0.5,
                                minHeight: "3em",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                mb: isSubscribed ? 2 : 0,
                            }}
                        >
                            {service.shortDescription}
                        </Typography>

                        {isAdmin && <Box
                            display="flex"
                            alignItems="center"
                            mt={1}
                            mb={2}
                        >
                            <AccountCircleOutlinedIcon color="action" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                                {clientsCount > 0 ? `${clientsCount} ${clientsCount === 1 ? 'cliente' : 'clientes'}` : 'Sin clientes aún'}
                            </Typography>
                        </Box>}

                        {!isSubscribed && <Stack
                            spacing={1}
                            my={4}
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="center"
                        >
                            {service.plans.map((plan) => (
                                <Chip
                                    key={plan._id}
                                    label={periodFormatter(plan.period)}
                                    size="medium"
                                />
                            ))}
                        </Stack>}

                        <Button
                            variant="contained"
                            color={isSubscribed ? "success" : "primary"}
                            fullWidth
                            sx={{ mt: "auto", borderRadius: 2 }}
                            onClick={() =>
                                (window.location.href = `/services/${service._id}`)
                            }
                        >
                            {isSubscribed ? "Ver suscripción" : "Ver detalles"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid >
    );

}
