import { Autorenew, CalendarToday, Cancel, CheckCircle, EventBusy, Payment } from "@mui/icons-material";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import { Subscription, SubscriptionStatus } from "../../types";
import { calculateNextDateToPay, dateFormatter, periodFormatter, subscriptionStatusColorsFormatter, subscriptionStatusFormatter } from "../../utils";

interface SubscriptionDetailsCardProps {
    subscription: Subscription;
    onCancel: () => void;
    onRenew: () => void;
}

export default function SubscriptionDetailsCard({ subscription, onCancel, onRenew }: SubscriptionDetailsCardProps) {
    const { plan, startDate, endDate, lastPaymentDate, status } = subscription;


    const canCancel = status === SubscriptionStatus.ACTIVE;
    const canRenew = status === SubscriptionStatus.CANCELED || status === SubscriptionStatus.EXPIRED;
    const isPendingPayment = status === SubscriptionStatus.PENDING_PAYMENT;

    const nextDateToPay = dateFormatter(calculateNextDateToPay(new Date(endDate)));

    return (
        <Grid>
            <Card
                sx={{
                    borderRadius: 3,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    minWidth: 360,
                    p: 3,
                    pb: 0,
                }}
            >
                <CardContent sx={{ p: 0 }}>
                    <Typography variant="h5" fontWeight={700} textAlign="center" mb={2}>
                        Detalles de suscripción
                    </Typography>

                    <Box textAlign="center" mb={3}>
                        <Chip
                            label={subscriptionStatusFormatter(status)}
                            color={subscriptionStatusColorsFormatter(status)}
                            icon={status === SubscriptionStatus.ACTIVE ? <CheckCircle /> : <Autorenew />}
                            sx={{ fontWeight: 600, fontSize: "0.9rem" }}
                        />
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Stack spacing={1.5}>
                        <Typography variant="body1" align="center" fontWeight={600}>
                            {plan.name} - {periodFormatter(plan.period)}
                        </Typography>


                        <Divider flexItem sx={{ my: 1 }} />

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <CalendarToday fontSize="small" color="primary" />
                            <Typography variant="body1">
                                <strong>Inicio:</strong> {dateFormatter(new Date(startDate))}
                            </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <EventBusy fontSize="small" color="error" />
                            <Typography variant="body1">
                                <strong>Vencimiento:</strong> {dateFormatter(new Date(endDate))}
                            </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <AttachMoneyOutlinedIcon fontSize="small" color="success" />
                            <Typography variant="body1">
                                <strong>Precio:</strong> {plan.price} {plan.currency}
                            </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Payment fontSize="small" color="success" />
                            <Typography variant="body1">
                                <strong>Pagado el:</strong>{" "}
                                {lastPaymentDate ? dateFormatter(new Date(lastPaymentDate)) : "-"}
                            </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <PendingActionsOutlinedIcon fontSize="small" color="warning" />
                            <Typography variant="body1">
                                <strong>Próximo pago:</strong>{" "}
                                {status === SubscriptionStatus.ACTIVE ? nextDateToPay : "-"}
                            </Typography>
                        </Stack>
                    </Stack>


                    {
                        canCancel && (
                            <>
                                <Divider sx={{ my: 3 }} />
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    size="large"
                                    startIcon={<Cancel />}
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: "none",
                                        fontWeight: 600,
                                    }}
                                    onClick={onCancel}
                                >
                                    Cancelar suscripción
                                </Button>
                            </>
                        )}


                    {canRenew &&
                        <>
                            <Divider sx={{ my: 3 }} />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                startIcon={<CheckCircle />}
                                sx={{
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 600,
                                }}
                                onClick={onRenew}
                            >
                                Reactivar suscripción
                            </Button>
                        </>
                    }
                </CardContent>

                {isPendingPayment && (
                    <Box textAlign="center" my={3}>
                        <Typography variant="body2" color="warning" fontWeight={600}>
                            Puede demorar 1 minuto en reflejarse el pago.
                        </Typography>
                    </Box>
                )}
            </Card>
        </Grid>
    );
}