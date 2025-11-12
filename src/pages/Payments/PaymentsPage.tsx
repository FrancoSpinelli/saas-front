import PaymentIcon from '@mui/icons-material/Payment';
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
import { getPayments } from "../../api/services/payments.service";
import EmptyState from "../../Components/EmptyState";
import Subtitle from "../../Components/Subtitle";
import { Payment } from "../../types";
import { dateFormatter, nameFormatter, paymentMethodFormatter, paymentStatusColorsFormatter, paymentStatusFormatter } from "../../utils";


interface PaymentsPageProps {
    userId?: string;
    isAdmin?: boolean;
}

export default function PaymentsPage({ userId, isAdmin }: PaymentsPageProps) {

    const [payments, setPayments] = useState<Payment[]>([]);
    const [, setLoading] = useState(true);

    const fetchPayments = async () => {
        try {
            const res = await getPayments(!isAdmin ? userId : undefined);
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
                    {isAdmin ? "Pagos" : "Mis Pagos"}
                </Subtitle>
            </Box>


            {
                !payments.length && !isAdmin ? <EmptyState icon={<PaymentIcon />} message="No se han registrados pagos." /> : (<TableContainer component={Paper} sx={{ mt: 1 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {isAdmin ? <TableCell>Cliente</TableCell> : null}
                                <TableCell>Servicio</TableCell>
                                <TableCell align="center">Plan</TableCell>
                                <TableCell align="center">Monto</TableCell>
                                <TableCell align="center">Método</TableCell>
                                <TableCell align="center">Periodo abonado</TableCell>
                                <TableCell align="center">Fecha de pago</TableCell>
                                <TableCell align="center">Estado</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow key={payment._id}>
                                    {isAdmin ? (<TableCell>
                                        {nameFormatter(payment.client)}
                                        <Typography variant="body2" color="text.secondary">
                                            {payment.client.email}
                                        </Typography>
                                    </TableCell>
                                    ) : null}

                                    <TableCell>
                                        {payment.subscription.service.name}
                                    </TableCell>


                                    <TableCell align="center">
                                        <Tooltip title={`Precio: $${payment.plan.price}`}>
                                            <Chip label={`${payment.plan.name}`} />
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
                                        {dateFormatter(new Date(payment.from))} - {dateFormatter(new Date(payment.to))}
                                    </TableCell>

                                    <TableCell align="center">
                                        {dateFormatter(new Date(payment.subscription.lastPaymentDate || payment.subscription.startDate))}
                                    </TableCell>

                                    <TableCell align="center">
                                        <Chip
                                            color={
                                                paymentStatusColorsFormatter(payment.status)
                                            }
                                            label={paymentStatusFormatter(payment.status)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                )
            }
        </Box>
    );
}