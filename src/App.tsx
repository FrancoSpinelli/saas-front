import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";

import CategoriesPage from "./pages/Categories/CategoriesPage";
import CreateCategoryPage from "./pages/Categories/CreateOrEditCategoryPage";
import HomePage from "./pages/Home/HomePage";
import PaymentsPage from "./pages/Payments/PaymentsPage";
import CreateOrEditPlanPage from "./pages/Plans/CreateOrEditPlanPage";
import PlansPage from "./pages/Plans/PlansPage";
import LoginPage from "./pages/Public/LoginPage";
import RegisterPage from "./pages/Public/RegisterPage";
import ServicesPage from "./pages/Services/ServicesPage";
import SubscriptionsPage from "./pages/Subscriptions/SubscriptionsPage";
import UsersPage from "./pages/User/UsersPage";
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
          <Route path="categories/create" element={
            <ProtectedRoute><CreateCategoryPage /></ProtectedRoute>
          } />
          <Route path="categories/edit/:id" element={
            <ProtectedRoute><CreateCategoryPage /></ProtectedRoute>
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
          <Route path="plans/create" element={
            <ProtectedRoute><CreateOrEditPlanPage /></ProtectedRoute>
          } />
          <Route path="plans/edit/:id" element={
            <ProtectedRoute><CreateOrEditPlanPage /></ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;