import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";

import { getUserProfile } from "./api/services";
import { ToastContext } from "./Components/Toast";
import { useFetch } from "./hooks/useFetch";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import CreateCategoryPage from "./pages/Categories/CreateOrEditCategoryPage";
import AdminHomePage from "./pages/Home/AdminHomePage";
import ClientHomePage from "./pages/Home/ClientHomePage";
import NotificationsPage from "./pages/Notifications/NotificationsPage";
import PaymentsPage from "./pages/Payments/PaymentsPage";
import CreateOrEditPlanPage from "./pages/Plans/CreateOrEditPlanPage";
import PlansPage from "./pages/Plans/PlansPage";
import EditProfilePage from "./pages/Profile/EditProfilePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import LoginPage from "./pages/Public/LoginPage";
import RegisterPage from "./pages/Public/RegisterPage";
import AllServices from "./pages/Services/AllServices";
import CreateOrEditServicePage from "./pages/Services/CreateOrEditServicePage";
import ServiceDetailPage from "./pages/Services/ServiceDetailPage";
import ServicesPage from "./pages/Services/ServicesPage";
import SubscriptionsPage from "./pages/Subscriptions/SubscriptionsPage";
import UsersPage from "./pages/User/UsersPage";
import ProtectedRoute from "./router/ProtectedRoute";
import { Role } from "./types";


function App() {
  const { data: user } = useFetch(getUserProfile);
  const isAdmin = user?.role === Role.ADMIN || false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute role={[Role.CLIENT]}>
                <ClientHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminHomePage />
              </ProtectedRoute>
            }
          />
          <Route path="users" element={
            <ProtectedRoute><UsersPage /></ProtectedRoute>
          } />
          <Route path="users/create" element={
            <ProtectedRoute><RegisterPage isAdmin /></ProtectedRoute>
          } />
          <Route path="categories" element={
            <ProtectedRoute><CategoriesPage /></ProtectedRoute>
          } />
          <Route path="categories/create" element={
            <ProtectedRoute><CreateCategoryPage /></ProtectedRoute>
          } />
          <Route path="categories/edit/:id" element={
            <ProtectedRoute><CreateCategoryPage /></ProtectedRoute>
          } />
          <Route path="services" element={
            <ProtectedRoute><ServicesPage /></ProtectedRoute>
          } />
          <Route path="services/create" element={
            <ProtectedRoute><CreateOrEditServicePage /></ProtectedRoute>
          } />
          <Route path="services/edit/:id" element={
            <ProtectedRoute><CreateOrEditServicePage /></ProtectedRoute>
          } />
          <Route path="plans" element={
            <ProtectedRoute><PlansPage /></ProtectedRoute>
          } />
          <Route path="plans/create" element={
            <ProtectedRoute><CreateOrEditPlanPage /></ProtectedRoute>
          } />
          <Route path="plans/edit/:id" element={
            <ProtectedRoute><CreateOrEditPlanPage /></ProtectedRoute>
          } />
          <Route path="payments" element={
            <ProtectedRoute role={[Role.ADMIN, Role.CLIENT]}><PaymentsPage isAdmin={isAdmin} /></ProtectedRoute>
          } />
          <Route path="subscriptions" element={
            <ProtectedRoute role={[Role.ADMIN, Role.CLIENT]}><SubscriptionsPage isAdmin={isAdmin} /></ProtectedRoute>
          } />
          <Route path="services/all" element={
            <ProtectedRoute role={[Role.CLIENT]}><AllServices /></ProtectedRoute>
          } />
          <Route path="services/:id" element={
            <ProtectedRoute role={[Role.ADMIN, Role.CLIENT]}
            ><ServiceDetailPage /></ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute role={[Role.ADMIN, Role.CLIENT]}
            ><ProfilePage /></ProtectedRoute>
          } />
          <Route path="profile/edit" element={
            <ProtectedRoute role={[Role.ADMIN, Role.CLIENT]}
            ><EditProfilePage /></ProtectedRoute>
          } />
          <Route path="notifications" element={
            <ProtectedRoute role={[Role.CLIENT]}
            ><NotificationsPage /></ProtectedRoute>
          } />
        </Route>
      </Routes>
      <ToastContext />
    </BrowserRouter>
  );
}

export default App;