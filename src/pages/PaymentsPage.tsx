import {
    Box,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { getPayments } from "../api/services/payments.service";
import Subtitle from "../Components/Subtitle";
import { Payment } from "../types";
import { nameFormatter, paymentMethodFormatter, paymentStatusColorsFormatter, paymentStatusFormatter, periodFormatter } from "../utils";



export default function PaymentsPage() {


    const [payments, setPayments] = useState<Payment[]>([]);
    const [, setLoading] = useState(true);

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
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Subtitle>
                    Pagos
                </Subtitle>
            </Box>


            <TableContainer component={Paper} sx={{ mt: 1 }}>
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
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {payments.map((payment) => (
                            <TableRow key={payment._id}>
                                <TableCell>
                                    {nameFormatter(payment.client)}
                                    <Typography variant="body2" color="text.secondary">
                                        {payment.client.email}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    {payment.subscription.service.name}
                                </TableCell>


                                <TableCell align="center">
                                    <Tooltip title={`Precio: $${payment.plan.price}`}>
                                        <Chip label={`${periodFormatter(payment.plan.period)}`} />
                                    </Tooltip>
                                </TableCell>

                                <TableCell align="center">{payment.plan.price} {payment.plan.currency}</TableCell>

                                <TableCell align="center">
                                    <Chip
                                        color="default"
                                        label={paymentMethodFormatter(payment.method)}
                                    />
                                </TableCell>

                                <TableCell align="center">
                                    <Chip
                                        color={
                                            paymentStatusColorsFormatter(payment.status)
                                        }
                                        label={paymentStatusFormatter(payment.status)}
                                    />
                                </TableCell>

                                <TableCell align="center">
                                    {new Date(payment.subscription.startDate).toLocaleDateString(
                                        "es-AR"
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}