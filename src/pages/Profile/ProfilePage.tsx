import { Box } from "@mui/material";
import { getUserProfile } from "../../api/services";
import Subtitle from "../../Components/Subtitle";
import { useFetch } from "../../hooks/useFetch";
import UserCard from "../User/UserCard";

export default function ProfilePage() {

    const { data: user } = useFetch(getUserProfile);

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


