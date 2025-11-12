import { Avatar, Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import { User } from "../../types";

interface UserCardProps {
    user: User;
    isAuthor?: boolean;
}

export default function UserCard({ user, isAuthor = false }: UserCardProps) {
    return (
        <Grid>
            <Card
                sx={{
                    borderRadius: 3,
                    p: 2,
                    textAlign: "center",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                }}
            >
                <Avatar
                    src={user.image}
                    alt={user.firstName}
                    sx={{
                        width: 120,
                        height: 120,
                        margin: "0 auto",
                        mb: 2,
                    }}
                />

                <Typography variant="h6" fontWeight={700}>
                    {user.firstName} {user.lastName}
                </Typography>

                {isAuthor &&
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={1}
                    >
                        Autor del curso
                    </Typography>
                }
                <Divider sx={{ my: 3 }} />

                <Box>
                    <Typography variant="body1">
                        <strong>Email:</strong> {user.email}
                    </Typography>
                </Box>

                <Button
                    variant="text"
                    size="large"
                    sx={{ mt: 4, borderRadius: 2, mx: "auto", display: "block" }}
                >
                    {isAuthor ? "Ver autor" : "Ver perfil"}
                </Button>
            </Card>
        </Grid>
    )
}

