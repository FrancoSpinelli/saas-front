import PersonIcon from "@mui/icons-material/Person";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    CssBaseline,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getCategories, getUserFromStorage, getUserProfile, updateUserProfile } from "../../api/services";
import { Category, PaymentMethod, UserProfile } from "../../types";
import { paymentMethodFormatter } from "../../utils";

export default function EditProfilePage() {
    const navigate = useNavigate();

    const storedUser = getUserFromStorage();
    if (!storedUser) {
        toast.error("No se encontró el usuario");
        navigate("/login");
        return;
    }

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [user, setUser] = useState<UserProfile | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [interests, setInterests] = useState<Category[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.BANK_TRANSFER);

    const fetchData = async () => {
        try {
            const [catsRes, userRes] = await Promise.all([
                getCategories(),
                getUserProfile()
            ]);

            setCategories(catsRes.data);
            setUser(userRes.data);
            setFirstName(userRes.data.firstName);
            setLastName(userRes.data.lastName);
            setEmail(userRes.data.email);
            setDescription(userRes.data.description || "");
            setPaymentMethod(userRes.data.paymentMethod)
            setInterests(userRes.data.interests || []);
        } catch (err) {
            setError("Error al cargar los datos del perfil");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [navigate]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            const payload: Partial<UserProfile> = {
                firstName,
                lastName,
                email,
                description,
                interests,
                paymentMethod,
            };

            const response = await updateUserProfile(user!._id, payload);
            if (response.success) {
                toast.success("Perfil actualizado con éxito");
                navigate("/profile");
            } else {
                toast.error(response.message || "Error al guardar los cambios");
            }
        } catch {
            setError("Error al guardar los cambios");
        } finally {
            setSaving(false);
        }
    };

    if (loading)
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                }}
            >
                <CircularProgress />
            </Box>
        );

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />

            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <PersonIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Editar Perfil
                </Typography>

                <Box component="form" onSubmit={handleSave} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <TextField
                            fullWidth
                            label="Nombre*"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Apellido*"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Correo electrónico*"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Descripción personal"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="payment-method-label">Método de pago</InputLabel>
                            <Select
                                labelId="payment-method-label"
                                value={paymentMethod}
                                label="Método de pago"
                                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                            >
                                {(Object.values(PaymentMethod) as PaymentMethod[]).map((pm) => (
                                    <MenuItem key={pm} value={pm}>
                                        {paymentMethodFormatter(pm)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="interests-label">Intereses</InputLabel>
                            <Select
                                labelId="interests-label"
                                multiple
                                value={interests.map(i => i._id)}
                                onChange={(e) => {
                                    const selectedIds = e.target.value as string[];
                                    const selectedInterests = selectedIds
                                        .map(id => categories.find(c => c._id === id))
                                        .filter(Boolean) as Category[];
                                    setInterests(selectedInterests);
                                }}
                                input={<OutlinedInput label="Intereses" />}
                                renderValue={(selected) => {
                                    const selectedIds = selected as string[];
                                    const selectedInterests = selectedIds
                                        .map(id => categories.find(c => c._id === id))
                                        .filter(Boolean) as Category[];
                                    return (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                            {selectedInterests.map((interest) => (
                                                <Chip
                                                    key={interest._id}
                                                    label={interest.name}
                                                    color="secondary"
                                                    variant="filled"
                                                />
                                            ))}
                                        </Box>
                                    );
                                }}
                            >
                                {categories.map((c) => (
                                    <MenuItem key={c._id} value={c._id}>
                                        {c.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 4, mb: 2 }}
                        disabled={saving}
                    >
                        {saving ? "Guardando..." : "Guardar cambios"}
                    </Button>

                    <Button
                        fullWidth
                        variant="text"
                        onClick={() => navigate("/profile")}
                        sx={{ mb: 2 }}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Container >
    );
} 