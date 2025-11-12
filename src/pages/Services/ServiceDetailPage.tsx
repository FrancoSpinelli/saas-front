import {
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
import { getServiceById } from "../../api/services";
import { Service } from "../../types";
import { periodFormatter } from "../../utils";
import UserCard from "../User/UserCard";

export default function ServiceDetailPage() {
    const { id } = useParams();
    const [service, setService] = useState<Service | null>(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getServiceById(id!);
                setService(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetch();
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
                spacing={4}
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

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="h6" fontWeight={600}>
                                    Planes disponibles
                                </Typography>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    flexWrap="wrap"
                                    mt={2}
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{ width: "100%", alignContent: "center" }}
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

                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        mt: 4,
                                        borderRadius: 2,
                                        mx: "auto",
                                        display: "block",
                                    }}
                                >
                                    Suscribirme
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <UserCard user={service.owner} isAuthor />
            </Grid>
        </Box>
    );
}