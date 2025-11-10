import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Box,
    Card,
    CardContent,
    Chip,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getPayments } from "../api/services/payments.service";
import { Payment } from "../types";
import { paymentMethodFormatter, paymentStatusColorsFormatter, paymentStatusFormatter, periodFormatter } from "../utils";



export default function PaymentsPage() {


    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPayments = async () => {
        try {
            const res = await getPayments();
            setPayments(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);


    return (
        <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                Pagos
            </Typography>

            <Card>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Cliente</TableCell>
                                    <TableCell>Servicio</TableCell>
                                    <TableCell align="center">Plan</TableCell>
                                    <TableCell align="center">Monto</TableCell>
                                    <TableCell align="center">Método</TableCell>
                                    <TableCell align="center">Estado</TableCell>
                                    <TableCell align="center">Fecha de pago</TableCell>
                                    <TableCell align="right">Acciones</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {payments.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell>
                                            {p.client.firstName} {p.client.lastName}
                                            <Typography variant="body2" color="text.secondary">
                                                {p.client.email}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            {p.subscription.service.name}
                                        </TableCell>


                                        <TableCell align="center">
                                            <Tooltip title={`Precio: $${p.plan.price}`}>
                                                <Chip label={`${periodFormatter(p.plan.period)}`} />
                                            </Tooltip>
                                        </TableCell>
                                        
                                        <TableCell align="center">${p.plan.price}</TableCell>

                                        <TableCell align="center">
                                            <Chip
                                                color="default"
                                                label={paymentMethodFormatter(p.method)}
                                            />
                                        </TableCell>

                                        <TableCell align="center">
                                            <Chip
                                                color={
                                                    paymentStatusColorsFormatter(p.status)
                                                }
                                                label={paymentStatusFormatter(p.status)}
                                            />
                                        </TableCell>

                                        <TableCell align="center">
                                            {new Date(p.subscription.startDate).toLocaleDateString(
                                                "es-AR"
                                            )}
                                        </TableCell>



                                        <TableCell align="right">
                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                <IconButton onClick={() => (console.log("Ver pago", p.id))}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => (console.log("Eliminar pago", p.id))}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
}