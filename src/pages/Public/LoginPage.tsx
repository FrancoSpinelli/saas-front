import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Checkbox, FormControlLabel } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../../api/services/auth.service";
import { Role } from "../../types";
import { loginValidation } from "../../validations/login.validation";

export interface LoginData {
    email: string;
    password: string;
    rememberMe: boolean;
}


export default function LoginPage() {

    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<string[]>([]);

    const passwordRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        setLoading(true);
        setErrors([]);

        const loginData: LoginData = {
            email,
            password,
            rememberMe
        };

        const errors = loginValidation(loginData);
        if (errors.length > 0) {
            setErrors(errors);
            setLoading(false);
            return;
        }

        try {
            const response = await login(loginData);
            if (response.success) {
                const user = response.data;
                const userInfo = {
                    _id: user._id,
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
                window.location.href = user.role === Role.ADMIN ? "/admin" : "/";
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
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <CssBaseline />

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h3"
                    fontWeight={800}
                    sx={{
                        mb: 4,
                        background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                        backgroundClip: "text",
                        textFillColor: "transparent",
                    }}
                >
                    My SaaS III
                </Typography>

                <Avatar sx={{ m: 1 }}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    Iniciar sesión
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Correo*"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Contraseña*"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        inputRef={passwordRef}
                    />

                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                        label="Recordarme"
                    /> */}

                    {errors.map((err, index) => (
                        <Alert key={index} severity="error" sx={{ mt: 1 }}>
                            {err}
                        </Alert>
                    ))}

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