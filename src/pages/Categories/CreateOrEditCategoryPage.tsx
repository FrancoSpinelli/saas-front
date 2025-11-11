import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Link,
    TextField,
    Typography
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CategoryIcon from "@mui/icons-material/Category";
import { toast } from "react-toastify";
import { createCategory, getCategoryById, updateCategory } from "../../api/services";
import { CreateCategoryDTO } from "../../types/dto";
import { categoryValidation } from "../../validations";

export default function CreateOrEditCategoryPage() {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        if (!isEditMode) {
            return;
        }

        const fetchData = async () => {
            try {
                const response = await getCategoryById(id!);
                if (response.success) {
                    const category = response.data;

                    setName(category.name);
                    setDescription(category.description || "");
                    setImage(category.image || "");
                } else {
                    toast.error("No se pudo cargar la categoría");
                }
            } catch (e) {
                toast.error("Error al cargar la categoría");
            }
        };

        fetchData();
    }, [id]);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setErrors([]);


        const category: CreateCategoryDTO = {
            name,
            description,
            image: image || undefined,
        };

        const errors = categoryValidation(category);
        if (errors.length > 0) {
            setErrors(errors);
            setLoading(false);
            return;
        }

        try {
            let response;
            if (isEditMode) {
                response = await updateCategory(id!, category);
            } else {
                response = await createCategory(category);
            }

            if (response.success) {
                toast.success(isEditMode ? "Categoría actualizada" : "Categoría creada");
                navigate("/categories");
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
                    {isEditMode ? "Editar Categoría" : "Crear Categoría"}
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
                        label="Descripción*"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        rows={3}
                    />

                    {/*                    <TextField
                        margin="normal"
                        fullWidth
                        label="URL de imagen (opcional)"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
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
                        {loading ? "Guardando..." : "Guardar"}
                    </Button>

                    <Grid container>
                        <Grid sx={{ mr: "auto" }}>
                            <Link href="/categories" variant="body2">
                                Volver
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}