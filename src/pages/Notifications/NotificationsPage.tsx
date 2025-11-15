import PaymentIcon from "@mui/icons-material/Payment";
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined';

import {
    Box,
    Card,
    CardContent,
    IconButton,
    Link as MUILink,
    Typography
} from "@mui/material";
import { JSX, useEffect, useState } from "react";
import { getNotifications, markAllAsRead } from "../../api/services/notifications.service";
import Subtitle from "../../Components/Subtitle";
import { Notification, NotificationType, ReferenceType } from "../../types";
import EmptyState from "../../Components/EmptyState";


const iconMap: Record<NotificationType, JSX.Element> = {
    SUBSCRIPTIONS_ACTIVE: <VideoSettingsIcon color="success" />,
    SUBSCRIPTIONS_PENDING: <VideoSettingsIcon color="warning" />,
    SUBSCRIPTIONS_EXPIRED: <VideoSettingsIcon color="error" />,
    SUBSCRIPTIONS_CANCELED: <VideoSettingsIcon color="error" />,
    SUBSCRIPTIONS_RENEWED: <VideoSettingsIcon color="success" />,
    PAYMENTS_SUCCESS: <PaymentIcon color="success" />,
};

function getLink(referenceType?: ReferenceType, id?: string) {
    if (!referenceType) return null;

    if (referenceType === ReferenceType.SERVICE) return `/services/${id}`;
    if (referenceType === ReferenceType.PAYMENT) return `/payments`;

    return null;
}

export default function NotificationPage() {

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const fetchNotifications = async () => {
        const res = await getNotifications();
        setNotifications(res.data);
    };

    useEffect(() => {
        fetchNotifications();
        markAllAsRead();
    }, []);



    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Subtitle>
                Notificaciones
            </Subtitle>

            {!notifications.length && (
                <EmptyState icon={<NotificationsIcon />} message="Aún no hay notificaciones." />
            )}

            {notifications.map((notif) => {
                const link = getLink(notif.referenceType, notif.referenceId);
                return (
                    <Card
                        key={notif._id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            borderLeft: notif.read ? "4px solid #ccc" : "4px solid #1976d2",
                            transition: "0.2s",
                            "&:hover": { backgroundColor: "#fafafa" },
                        }}
                    >
                        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <IconButton size="large" disableRipple>{iconMap[notif.type]}</IconButton>

                            <Box>
                                <Typography variant="body1" fontWeight={600}>
                                    {notif.message}
                                </Typography>
                                {notif.createdAt && (
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(notif.createdAt).toLocaleTimeString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: false })}
                                    </Typography>
                                )}
                            </Box>
                        </CardContent>

                        {link !== null && (
                            <Box sx={{ marginLeft: "auto", paddingRight: 4 }}>
                                <MUILink href={link} underline="hover" fontWeight="bold">
                                    Ver
                                </MUILink>
                            </Box>
                        )}
                    </Card>
                );
            })}
        </Box>
    );
}