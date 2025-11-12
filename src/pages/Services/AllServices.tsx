import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getServices, getSubscriptions, getUserFromStorage } from '../../api/services';
import Subtitle from '../../Components/Subtitle';
import { Service, Subscription } from '../../types';
import ServiceCard from './ServiceCard';

export default function AllServices() {
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

    return (

        <Box p={3}>
            <Subtitle>Servicios disponibles</Subtitle>

            <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="stretch"
            >
                {services.map((service) => {
                    const isSubscribed = subscriptions.some(
                        (s) => s.service._id === service._id
                    );
                    return <ServiceCard key={service._id} service={service} isSubscribed={isSubscribed} />;
                })}
            </Grid>
        </Box>
    )
}
