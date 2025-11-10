import {
    Box,
    Typography
} from "@mui/material";


import { getUserFromStorage } from "../api/services";

export default function HomePage() {

    const currentUser = getUserFromStorage();

    if (!currentUser) {
        return (
            <Box p={3}>
                <Typography variant="h6">
                    Por favor, inicia sesión para ver el contenido.
                </Typography>
            </Box>
        );
    }

    /*    const [services, setServices] = useState(mockServices);
       const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
       const [payments, setPayments] = useState(mockPayments);
   
       useEffect(() => {
           setTimeout(() => {
               setServices(mockServices);
               setSubscriptions(mockSubscriptions);
               setPayments(mockPayments);
           }, 300);
       }, []);
   
       const userSubscriptions = subscriptions.filter(
           (s) => s.client.id === currentUser.id
       ); */

    return (
        <></>
        /*       <Box p={3}>
                  <Typography variant="h4" mb={2}>
                      Bienvenido, {currentUser.firstName} {currentUser.lastName}
                  </Typography>
      
                  {userSubscriptions
                      .filter((sub) => !sub.paid)
                      .map((sub) => (
                          <Alert severity="warning" sx={{ mb: 2 }} key={sub.id}>
                              Tu suscripción a <strong>{sub.service.name}</strong> está vencida o impaga.
                          </Alert>
                      ))}
      
                  <Typography variant="h5" mt={4} mb={2}>
                      Servicios disponibles
                  </Typography>
      
                  <Grid container spacing={2}>
                      {services.map((service) => (
                          <Grid key={service.id}>
                              <Card>
                                  <CardContent>
                                      <Stack direction="row" spacing={2} alignItems="center">
                                          <Avatar
                                              src={service.category.image}
                                              alt={service.category.name}
                                              sx={{ width: 48, height: 48 }}
                                          />
                                          <Box>
                                              <Typography variant="h6">{service.name}</Typography>
                                              <Typography variant="body2" color="text.secondary">
                                                  {service.description}
                                              </Typography>
                                          </Box>
                                      </Stack>
      
                                      <Typography mt={2} fontWeight="bold">
                                          Desde ${service.plans[0].price} / {service.plans[0].period}
                                      </Typography>
      
                                      <Typography variant="caption" color="text.secondary">
                                          Categoría: {service.category.name}
                                      </Typography>
                                  </CardContent>
                              </Card>
                          </Grid>
                      ))}
                  </Grid>
      
                  <Typography variant="h5" mt={4} mb={2}>
                      Mis Suscripciones
                  </Typography>
      
                  <Grid container spacing={2}>
                      {userSubscriptions.map((sub) => (
                          <Grid key={sub.id}>
                              <Card>
                                  <CardContent>
                                      <Typography variant="h6">
                                          {sub.service.name}
                                      </Typography>
      
                                      <Typography variant="body2" color="text.secondary">
                                          Plan: {sub.plan.period} — ${sub.plan.price}
                                      </Typography>
      
                                      <Typography variant="body2" mt={1}>
                                          Inicio: {sub.startDate.toLocaleDateString()}
                                      </Typography>
                                      <Typography variant="body2">
                                          Fin: {sub.endDate.toLocaleDateString()}
                                      </Typography>
      
                                      <Typography
                                          mt={1}
                                          color={sub.paid ? "success.main" : "error.main"}
                                      >
                                          {sub.paid ? "Pagado ✅" : "Impago ❌"}
                                      </Typography>
                                  </CardContent>
                              </Card>
                          </Grid>
                      ))}
                  </Grid>
      
                  <Typography variant="h5" mt={4} mb={1}>
                      Últimos Pagos
                  </Typography>
      
                  {mockPayments
                      .filter((p) => p.subscription.client.id === currentUser.id)
                      .slice(0, 5)
                      .map((p) => (
                          <Card key={p.id} sx={{ mb: 2 }}>
                              <CardContent>
                                  <Typography variant="h6">
                                      {p.subscription.service.name}
                                  </Typography>
      
                                  <Typography variant="body2">
                                      Monto: ${p.amount}
                                  </Typography>
      
                                  <Typography variant="body2">
                                      Método: {p.paymentMethod}
                                  </Typography>
      
                                  <Typography variant="body2">
                                      Fecha: {p.paidAt.toLocaleDateString()}
                                  </Typography>
                              </CardContent>
                          </Card>
                      ))}
              </Box> */
    );
}