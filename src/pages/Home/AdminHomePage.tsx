import {
    Avatar,
    Box,
    Card,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../api/services/dashboard.service";
import { DashboardData } from "../../types";
import { dateFormatter, paymentMethodFormatter } from "../../utils";
import ServiceCard from "../Services/ServiceCard";

export default function AdminHomePage() {

    const [data, setData] = useState<DashboardData | null>(null);

    const fetchDashboardData = async () => {
        const res = await getDashboardData();
        setData(res.data);
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);


    if (!data) {
        return <Typography>Cargando datos del dashboard...</Typography>;
    }

    const {
        totalSubscriptions,
        totalAdmins,
        totalClients,
        totalServices,
        subscriptionsByCategory,
        activeSubscriptions,
        pendingPaymentSubscriptions,
        canceledSubscriptions,
        expiredSubscriptions,
        revenueThisMonth,
        revenueLastMonth,
        totalRevenue,
        lastClientSubscriptions,
        lastPayments,
        topSubscribedServices,
    } = data;


    const generalStats = [
        { label: "Suscripciones", value: totalSubscriptions, color: "success" },
        { label: "Servicios", value: totalServices, color: "primary" },
        { label: "Clientes", value: totalClients, color: "primary" },
        { label: "Admins", value: totalAdmins, color: "warning" },
        { label: "Suscripciones activas", value: activeSubscriptions, color: "success" },
        { label: "Suscripciones pendientes", value: pendingPaymentSubscriptions, color: "warning" },
        { label: "Suscripciones canceladas", value: canceledSubscriptions, color: "error" },
        { label: "Suscripciones expiradas", value: expiredSubscriptions, color: "default" },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight={700} mb={3}>
                Panel de Administrador
            </Typography>

            <Typography variant="h5" fontWeight={700} mt={5} mb={2}>
                Estadísticas Generales
            </Typography>
            <Grid container spacing={2}>
                {generalStats.map((item, i) => (
                    <Grid key={i} sx={{ flexGrow: 1, width: { xs: '100%', sm: '45%', md: '22%' } }}>
                        <StatCard title={item.label} value={item.value} color={item.color} />
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" fontWeight={700} mt={5} mb={2}>
                Ingresos
            </Typography>

            <Grid container spacing={2} mt={1} >
                <Grid sx={{ flexGrow: 1, width: { xs: '30%' }, alignSelf: 'stretch' }}>
                    <StatCard title="Ingresos acumulados" value={`${totalRevenue} USD`} color="success" />
                </Grid>

                <Grid sx={{ flexGrow: 1, width: { xs: '30%' } }}>
                    <StatCard title="Ingresos del mes en curso" value={`${revenueThisMonth} USD`} color="success" />
                </Grid>

                <Grid sx={{ flexGrow: 1, width: { xs: '30%' } }}>
                    <StatCard title="Ingresos del mes pasado" value={`${revenueLastMonth} USD`} color="success" />
                </Grid>
            </Grid >

            <Typography variant="h5" fontWeight={700} mt={5} mb={2}>
                Suscripciones por categoría
            </Typography>
            <Grid container spacing={2}>
                {subscriptionsByCategory.map((cat: any) => (
                    <Grid key={cat._id} sx={{ flexGrow: 1, width: { xs: '100%', sm: '45%', md: '22%' } }}>
                        <StatCard title={cat.categoryName} value={cat.total} color="secondary" />
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" fontWeight={700} mt={5} mb={2}>
                Top servicios más suscriptos
            </Typography>
            <Grid container spacing={2}>
                {topSubscribedServices.map((service: any) => <ServiceCard key={service._id} service={service} clientsCount={service.subscriptionCount} />)}
            </Grid>

            <Typography variant="h5" fontWeight={700} mt={5} mb={2}>
                Últimas suscripciones
            </Typography>
            <Grid container spacing={2}>
                {lastClientSubscriptions.map((sub: any) => (
                    <Grid key={sub._id}>
                        <Card sx={{ p: 2, borderRadius: 3, width: 300 }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar src={sub.client?.image} />
                                <Box>
                                    <Typography fontWeight={600}>
                                        {sub.client.firstName} {sub.client.lastName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" height={40}>
                                        {sub.service.name}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Divider sx={{ my: 1 }} />

                            <Typography variant="body2" color="text.secondary">
                                Inicio: {dateFormatter(sub.startDate)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Fin: {dateFormatter(sub.endDate)}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" fontWeight={700} mt={5} mb={2}>
                Últimos pagos
            </Typography>
            <Grid container spacing={2}>
                {lastPayments.map((payment: any) => (
                    <Grid key={payment._id}>
                        <Card sx={{ flexGrow: 1, p: 2, borderRadius: 3, width: 300 }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar src={payment.client.image} />
                                <Box>
                                    <Typography fontWeight={600}>
                                        {payment.client.firstName} {payment.client.lastName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {payment.plan.name} — ${payment.amount}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Divider sx={{ my: 1 }} />

                            <Typography variant="body2" color="text.secondary">
                                Pagado el: {dateFormatter(payment.paidAt)}
                            </Typography>

                            <Chip
                                label={paymentMethodFormatter(payment.method)}
                                size="small"
                                sx={{ mt: 1, textTransform: "capitalize" }}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box >
    );
}

interface StatCardProps {
    title: string;
    value: number | string;
    color: string;
}
function StatCard({ title, value, color = "primary" }: StatCardProps) {
    return (
        <Card sx={{ borderRadius: 3, p: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <Typography variant="h6" fontWeight={600} align="center">
                {title}
            </Typography>
            <Typography variant="h4" fontWeight={800} color={color} mt={1} align="center">
                {value}
            </Typography>
        </Card>
    );
}