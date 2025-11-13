import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserFromStorage, getUserProfile } from "../../api/services";
import { UserProfile } from "../../types";
import UserCard from "../User/UserCard";
import Subtitle from "../../Components/Subtitle";

export default function ProfilePage() {

    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const currentUser = getUserFromStorage();
    if (!currentUser) {
        return <div>Cargando...</div>;
    }

    const fetchUserProfile = async () => {
        try {
            const res = await getUserProfile();
            const user = res.data;
            setUser(user);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [currentUser._id])

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <Box p={3}>
            <Subtitle>Mi Perfil</Subtitle>
            <UserCard user={user} />
        </Box>
    )
}


