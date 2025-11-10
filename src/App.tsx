import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import {
  CategoriesPage,
  HomePage,
  LoginPage,
  PaymentsPage,
  PlansPage,
  RegisterPage,
  ServicesPage,
  SubscriptionsPage,
  UsersPage
} from "./pages";
import ProtectedRoute from "./router/ProtectedRoute";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="users" element={
            <ProtectedRoute><UsersPage /></ProtectedRoute>
          } />
          <Route path="categories" element={
            <ProtectedRoute><CategoriesPage /></ProtectedRoute>
          } />
          <Route path="services" element={
            <ProtectedRoute><ServicesPage /></ProtectedRoute>
          } />
          <Route path="payments" element={
            <ProtectedRoute><PaymentsPage /></ProtectedRoute>
          } />
          <Route path="subscriptions" element={
            <ProtectedRoute><SubscriptionsPage /></ProtectedRoute>
          } />
          <Route path="plans" element={
            <ProtectedRoute><PlansPage /></ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;