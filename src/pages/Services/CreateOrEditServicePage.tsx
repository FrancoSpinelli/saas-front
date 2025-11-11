import {
    Alert,
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    CssBaseline,
    FormControl,
    Grid,
    InputLabel,
    Link,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CategoryIcon from "@mui/icons-material/Category";
import { toast } from "react-toastify";

import {
    createService,
    getCategories,
    getPlans,
    getServiceById,
    updateService
} from "../../api/services";

import { Category, Plan } from "../../types";
import { CreateServiceDTO } from "../../types/dto";
import { planInfoFormatter } from "../../utils";
import { serviceValidation } from "../../validations";

export default function CreateOrEditServicePage() {

    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<Category | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [image, setImage] = useState("");

    const [categories, setCategories] = useState<Category[]>([]);
    const [plansList, setPlansList] = useState<Plan[]>([]);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        const fetchSupportData = async () => {
            try {
                const [categoriesRes, plansRes] = await Promise.all([
                    getCategories(),
                    getPlans(),
                ]);

                if (categoriesRes.success) setCategories(categoriesRes.data);
                if (plansRes.success) setPlansList(plansRes.data);

            } catch {
                toast.error("Error cargando datos auxiliares");
            }
        };

        fetchSupportData();
    }, []);

    useEffect(() => {
        if (!isEditMode) return;

        const fetch = async () => {
            try {
                const res = await getServiceById(id!);

                if (!res.success) {
                    toast.error("No se pudo cargar el servicio");
                    return;
                }

                const service = res.data;

                setName(service.name);
                setDescription(service.description);
                setCategory(service.category || null);
                setPlans(service.plans || []);
                setImage(service.image || "");

            } catch {
                toast.error("Error cargando servicio");
            }
        };

        fetch();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setErrors([]);

        const service: CreateServiceDTO = {
            name,
            description,
            category: category!,
            plans,
            image: image || undefined,
        };

        const validationErrors = serviceValidation(service);
        if (validationErrors.length) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        try {
            let response;

            if (isEditMode) {
                response = await updateService(id!, service);
            } else {
                response = await createService(service);
            }

            if (!response.success) {
                toast.error(response.message || "Error inesperado");
                return;
            }

            toast.success(isEditMode ? "Servicio actualizado" : "Servicio creado");
            navigate("/services");

        } catch (error) {
            toast.error("Error inesperado");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar sx={{ m: 1 }}>
                    <CategoryIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    {isEditMode ? "Editar Servicio" : "Crear Servicio"}
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
                        margin="normal"
                        fullWidth
                        multiline
                        rows={3}
                        label="Descripción*"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* CATEGORY */}
                    <TextField
                        select
                        margin="normal"
                        fullWidth
                        label="Categoría*"
                        value={category ? category._id : ""}
                        onChange={(e) => {
                            const id = e.target.value as string;
                            const cat = categories.find(c => c._id === id) || null;
                            setCategory(cat);
                        }}
                    >
                        {categories.map(c => (
                            <MenuItem key={c._id} value={c._id}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* PLANS MULTISELECT */}
                    <FormControl margin="normal" fullWidth>
                        <InputLabel>Planes*</InputLabel>

                        <Select
                            multiple
                            value={plans.map(p => p._id)}
                            onChange={(e) => {
                                const selectedIds = e.target.value as string[];
                                const selectedPlans = selectedIds.map(id => plansList.find(p => p._id === id)).filter(Boolean) as Plan[];
                                setPlans(selectedPlans);
                            }}
                            input={<OutlinedInput label="Planes" />}
                            renderValue={(selected) => {
                                const selectedIds = selected as string[];
                                const selectedPlans = selectedIds.map(id => plansList.find(p => p._id === id)).filter(Boolean) as Plan[];
                                return (
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                        {selectedPlans.map(plan => (
                                            <Chip
                                                key={plan._id}
                                                label={plan.name}
                                            />
                                        ))}
                                    </Box>
                                );
                            }}
                        >
                            {plansList.map(p => (
                                <MenuItem key={p._id} value={p._id}>
                                    {planInfoFormatter(p)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/*                    <TextField
                        margin="normal"
                        fullWidth
                        label="URL de imagen (opcional)"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
 */}
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
                        {loading ? "Guardando..." : "Guardar"}
                    </Button>

                    <Grid container>
                        <Grid sx={{ mr: "auto" }}>
                            <Link href="/services" variant="body2">Volver</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}