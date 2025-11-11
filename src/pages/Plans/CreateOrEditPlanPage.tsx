import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Link,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CategoryIcon from "@mui/icons-material/Category";
import { toast } from "react-toastify";

import { createPlan, getPlanById, updatePlan } from "../../api/services";
import { Currency, Period } from "../../types";
import { CreatePlanDTO } from "../../types/dto";
import { periodFormatter } from "../../utils";
import { planValidation } from "../../validations";

export default function CreateOrEditPlanPage() {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [name, setName] = useState("");
    const [period, setPeriod] = useState<Period>(Period.MONTHLY);
    const [price, setPrice] = useState<string>("0");
    const [currency, setCurrency] = useState<Currency>(Currency.USD);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        if (!isEditMode) return;

        const fetch = async () => {
            try {
                const response = await getPlanById(id!);

                if (response.success) {
                    const plan = response.data;

                    setName(plan.name);
                    setPeriod(plan.period);
                    setPrice(plan.price.toString());
                    setCurrency(plan.currency);

                } else {
                    toast.error("No se pudo cargar el plan");
                }
            } catch {
                toast.error("Error cargando el plan");
            }
        };

        fetch();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setErrors([]);

        const plan: CreatePlanDTO = {
            name,
            period,
            price: Number(price),
            currency,
        };

        const errors = planValidation(plan);
        if (errors.length > 0) {
            setErrors(errors);
            setLoading(false);
            return;
        }

        try {
            let response;

            if (isEditMode) {
                response = await updatePlan(id!, plan);
            } else {
                response = await createPlan(plan);
            }

            if (response.success) {
                toast.success(isEditMode ? "Plan actualizado" : "Plan creado");
                navigate("/plans");
            } else {
                toast.error(response.message || "Error inesperado");
                return;
            }

        } catch {
            toast.error("Error inesperado");
        } finally {
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
                    <CategoryIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    {isEditMode ? "Editar Plan" : "Crear Plan"}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Nombre*"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                        select
                        fullWidth
                        margin="normal"
                        label="Periodo*"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value as Period)}
                    >
                        {
                            Object.values(Period).map((period) => (
                                <MenuItem key={period} value={period}>{periodFormatter(period)}</MenuItem>
                            ))
                        }
                    </TextField>

                    <TextField
                        select
                        fullWidth
                        margin="normal"
                        label="Moneda*"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as Currency)}
                    >
                        {Object.values(Currency).map((currency) => (
                            <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        type="number"
                        margin="normal"
                        fullWidth
                        label="Precio*"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    {errors.map((err, i) => (
                        <Alert key={i} severity="error" sx={{ mt: 1 }}>
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
                        {loading ? "Guardando..." : "Guardar"}
                    </Button>

                    <Grid container>
                        <Grid sx={{ mr: "auto" }}>
                            <Link href="/plans" variant="body2">Volver</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}