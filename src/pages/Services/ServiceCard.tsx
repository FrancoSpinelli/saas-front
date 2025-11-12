import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { Service } from "../../types";
import { periodFormatter } from "../../utils";


interface ServiceCardProps {
    service: Service;
    isSubscribed?: boolean;
}
export default function ServiceCard({ service, isSubscribed = false }: ServiceCardProps) {
    return (<Grid
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
                </Box>

                <Box p={2} sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
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
                        }}
                    >
                        {service.shortDescription}
                    </Typography>

                    <Stack
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
                    </Stack>

                    <Button
                        variant={isSubscribed ? "outlined" : "contained"}
                        fullWidth
                        sx={{ mt: "auto", borderRadius: 2 }}
                        onClick={() =>
                            (window.location.href = `/services/${service._id}`)
                        }
                    >
                        {isSubscribed ? "Ver suscripción" : "Ver servicio"}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    </Grid>
    );

}
