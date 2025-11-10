import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { login } from "../api/services/auth.service";
import { toast } from "react-toastify";

interface LoginData {
    email: string;
    password: string;
    rememberMe: boolean;
}


export default function LoginPage() {

    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const passwordRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        setLoading(true);

        const loginData: LoginData = {
            email,
            password,
            rememberMe
        };

        try {
            const response = await login(loginData);
            if (response.success) {
                console.log("Login exitoso:", response.data);

                const user = response.data;
                const userInfo = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    image: user.image,
                };

                if (rememberMe) {
                    localStorage.setItem("token", user.token);
                    localStorage.setItem("user", JSON.stringify(userInfo));
                } else {
                    sessionStorage.setItem("token", user.token);
                    sessionStorage.setItem("user", JSON.stringify(userInfo));
                }
                window.location.href = "/";
            }
        } catch (error: any) {
            setPassword("");
            passwordRef.current?.focus();
            toast.error(error.response?.data?.message || "Error al iniciar sesión", {
                onClose: () => setLoading(false),
                autoClose: 1000,
            });
        }


    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1 }}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Iniciar sesión
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        inputRef={passwordRef}
                    />

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                        label="Recordarme"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Ingresar"}
                    </Button>

                    <Grid container>
                        <Grid sx={{ mr: "auto" }}>
                            <Link href="#" variant="body2">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </Grid>
                        <Grid sx={{ ml: "auto" }}>
                            <Link href="/register" variant="body2">
                                {"¿No tenés cuenta? Registrate"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}