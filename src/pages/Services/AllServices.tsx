import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getActiveServices, getUserProfile } from '../../api/services';
import Subtitle from '../../Components/Subtitle';
import { Service, Subscription, SubscriptionStatus, UserProfile } from '../../types';
import ServiceCard from './ServiceCard';

export default function AllServices() {
    const [loading, setLoading] = useState(true);

    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);


    const fetchData = async () => {
        try {
            const [servicesRes, subsRes] = await Promise.all([
                getActiveServices(),
                getUserProfile(),
            ]);

            const orderedServices = servicesRes.data.sort((a: Service, b: Service) =>
                a.name.localeCompare(b.name)
            );

            setServices(orderedServices);
            setCurrentUser(subsRes.data);
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
            <Subtitle>Todos los servicios</Subtitle>

            <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="stretch"
            >
                {services.map((service) => {
                    const isSubscribed = currentUser?.subscriptions.some(
                        (sub) => sub.service._id === service._id && sub.status === SubscriptionStatus.ACTIVE
                    ) || false;
                    return <ServiceCard key={service._id} service={service} isSubscribed={isSubscribed} />;
                })}
            </Grid>
        </Box>
    )
}