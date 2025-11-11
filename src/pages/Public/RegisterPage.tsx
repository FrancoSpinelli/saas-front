import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, registerAdmin } from "../../api/services";
import { registerValidation } from "../../validations/register.validation";

export interface RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterProps {
    isAdmin?: boolean;
}

export default function RegisterPage({ isAdmin = false }: RegisterProps) {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setErrors([]);


        const registerData: RegisterDto = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword: repeatPassword
        };

        const errors = registerValidation(registerData);
        if (errors.length > 0) {
            setErrors(errors);
            setLoading(false);
            return;
        }

        try {
            let response = null;
            if (isAdmin) {
                response = await registerAdmin(registerData);
            } else {
                response = await register(registerData);
            }
            if (response.success) {
                const token = response.data.token;
                if (!isAdmin) {
                    sessionStorage.setItem("token", token);
                }
                toast.success("Registro exitoso", { onClose: () => navigate(isAdmin ? "/users" : "/") });

            } else {
                toast.error(response.message || "Error inesperado");
                setLoading(false);
                return;
            }
        } catch {
            toast.error("Error al registrarse");
            setLoading(false);
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
                    Crear cuenta
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

                    {isAdmin && (
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Rol"
                            value={"Admin"}
                            disabled
                        />
                    )}

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Nombre*"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        autoComplete="given-name"
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Apellido*"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        autoComplete="family-name"
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Correo*"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        type="password"
                        label="Contraseña*"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        type="password"
                        label="Repetir contraseña*"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        autoComplete="new-password"
                    />

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
                        {loading ? "Cargando..." : isAdmin ? "Crear Usuario" : "Registrarse"}
                    </Button>

                    {!isAdmin && (
                        <Grid container justifyContent="right">
                            <Grid sx={{ mr: "right" }}>
                                <Link href="/login" variant="body2">
                                    ¿Ya tenés cuenta? Iniciar sesión
                                </Link>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Box>
        </Container>
    );
}