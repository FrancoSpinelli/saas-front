import { useEffect } from "react";
import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const socket = io(URL);

const PROFILE_UPDATED = "PROFILE_UPDATED";
interface Notification {
    userId: string;
    timestamp: Date;
}

interface ProfileListenerProps {
    userId: string;
    onMessage: () => void;
}

export default function ProfileListener({ userId, onMessage }: ProfileListenerProps) {
    useEffect(() => {
        socket.on(PROFILE_UPDATED, (data: Notification) => {
            if (data.userId === userId) {
                onMessage();
            }
        });
        return () => {
            socket.off(PROFILE_UPDATED);
        };
    }, [userId, onMessage]);

    return null;
}