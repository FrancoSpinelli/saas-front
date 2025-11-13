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
    Typography,
} from "@mui/material";
import { SubscriptionStatus, UserProfile } from "../../types";
import { dateFormatter, paymentMethodFormatter } from "../../utils";

interface UserCardProps {
    user: UserProfile;
}


export default function UserCard({ user }: UserCardProps) {

    const activeSubscriptions = user.subscriptions.filter(sub => sub.status === SubscriptionStatus.ACTIVE);
    const pendingPaymentsSubscriptions = user.subscriptions.filter(sub => sub.status === SubscriptionStatus.PENDING_PAYMENT);

    return (
        <Grid container justifyContent="center">
            <Card
                sx={{
                    borderRadius: 3,
                    p: 2,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    minWidth: 500
                }}
            >
                <CardContent sx={{ textAlign: "center" }}>
                    <Avatar
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                        sx={{
                            width: 120,
                            height: 120,
                            margin: "0 auto",
                            mb: 2,
                        }}
                    />

                    <Typography variant="h6" fontWeight={700}>
                        {user.firstName} {user.lastName}
                    </Typography>


                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1, mb: 3 }}>
                        <Typography variant="body1" align="left">
                            <strong>Email:</strong> {user.email}
                        </Typography>
                        <Typography variant="body1" align="left">
                            <strong> Miembro desde:</strong> {dateFormatter(user.createdAt)}
                        </Typography>
                        <Typography
                            variant="body1"
                            align="left"
                        >
                            <strong>Método de pago:</strong> {paymentMethodFormatter(user.paymentMethod)}
                        </Typography>
                        <Typography
                            variant="body1"
                            align="left"
                        >
                            <strong>Estado:</strong> {user.active ? "Activo" : "Inactivo"}
                        </Typography>

                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box textAlign="left" mb={3}>
                        <Typography variant="h6" fontWeight={600} mb={1}>
                            Sobre mí
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.description || "Sin descripción proporcionada."}
                        </Typography>
                    </Box>

                    <Box textAlign="left" mb={3}>
                        <Typography variant="h6" fontWeight={600} mb={1}>
                            Intereses
                        </Typography>
                        {user.interests.length > 0 ? (
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {user.interests.map((cat) => (
                                    <Chip key={cat._id} label={cat.name} color="secondary" variant="outlined" />
                                ))}
                            </Stack>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                Sin intereses definidos
                            </Typography>
                        )}
                    </Box>

                    <Box textAlign="left" mb={3}>
                        <Typography variant="h6" fontWeight={600} mb={1}>
                            Suscripciones activas
                        </Typography>
                        {activeSubscriptions.length > 0 ? (
                            <Stack spacing={1}>
                                {activeSubscriptions.map((sub) => (
                                    <Typography
                                        key={sub._id}
                                        variant="body2"
                                        sx={{
                                            borderLeft: "3px solid #4caf50",
                                            pl: 1,
                                        }}
                                    >
                                        {sub.service.name}
                                    </Typography>
                                ))}
                            </Stack>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No tiene suscripciones activas
                            </Typography>
                        )}
                    </Box>

                    <Box textAlign="left" mb={3}>
                        <Typography variant="h6" fontWeight={600} mb={1}>
                            Suscripciones pendientes de pago
                        </Typography>
                        {pendingPaymentsSubscriptions.length > 0 ? (
                            <Stack spacing={1}>
                                {pendingPaymentsSubscriptions.map((sub) => (
                                    <Typography
                                        key={sub._id}
                                        variant="body2"
                                        sx={{
                                            borderLeft: "3px solid #ff9800",
                                            pl: 1,
                                        }}
                                    >
                                        {sub.service.name}
                                    </Typography>
                                ))}
                            </Stack>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No tiene suscripciones  pendientes de pago
                            </Typography>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        href="/profile/edit"
                        sx={{ mt: 2 }}
                    >
                        Editar Perfil
                    </Button>

                </CardContent>
            </Card>
        </Grid>
    );
}