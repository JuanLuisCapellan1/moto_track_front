import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PrimaryColorProvider } from './context/PrimaryColorContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './components/Dashboard/CommonComponts/ToastNotifications';
import { ConfigProvider, App as AntApp } from 'antd';
import Login from './pages/Auth/LogIn';
import Register from './pages/Auth/Register';
import Admin from './pages/Dashboard/Admin/AdminDashboard';
import AdminSolicitudes from './pages/Dashboard/Admin/AdminSolicitudes';
import AdminEmpleados from './pages/Dashboard/Admin/AdminGestionEmpleado';
import EmpleadoDashboard from './pages/Dashboard/Empleado/EmpleadoDashboard';
import EmpleadoGestion from './pages/Dashboard/Empleado/EmpleadoGestion';
import Layout from './Layout/Layout';
import CiudadanoDashboardPage from './pages/Dashboard/Ciudadano/CiudadanoDashboardPage';
import RegistrarPage from './pages/Dashboard/Ciudadano/RegistrarPage';
import MotocicletasPage from './pages/Dashboard/Ciudadano/MotocicletasPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoadingOverlay from './components/LoadingOverlay';

// Updated ProtectedRoute component that uses the auth context
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, isAuthenticated, loading } = useAuth();

   // Add a check for loading state
   if (loading) {
    // Return a loading indicator or null while checking authentication
    return <LoadingOverlay isLoading={loading} text="Cargando página..."/>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(currentUser.role)) {
    // Redirect based on role
    if (currentUser.role === 'administrador') {
      return <Navigate to="/panel/admin" replace />;
    } else if (currentUser.role === 'empleado') {
      return <Navigate to="/panel/empleado" replace />;
    } else {
      return <Navigate to="/panel/ciudadano" replace />;
    }
  }
  
  return children;
};

// Dashboard Routes with its own NotificationProvider that has access to theme
const DashboardRoutes = () => {
  return (
    <PrimaryColorProvider>
      <ThemeProvider>
        <NotificationProvider>
          <Layout />
        </NotificationProvider>
      </ThemeProvider>
    </PrimaryColorProvider>
  );
};

// Public Routes with light theme only
const PublicRoutes = () => {
  return (
    <Routes>
      {/* Public routes - always have white background */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes with theme */}
      <Route 
        path="/panel" 
        element={
          <ProtectedRoute allowedRoles={['administrador', 'empleado', 'ciudadano']}>
            <DashboardRoutes />
          </ProtectedRoute>
        }
      >
        <Route path="admin" element={<Admin />} />
        <Route path="admin/solicitudes" element={<AdminSolicitudes />} />
        <Route path="admin/empleados" element={<AdminEmpleados />} />
        <Route path="empleado" element={<EmpleadoDashboard />} />
        <Route path="empleado/gestion" element={<EmpleadoGestion />} />
        <Route path="ciudadano" element={<CiudadanoDashboardPage />} />
        <Route path="ciudadano/registrar" element={<RegistrarPage />} />
        <Route path="ciudadano/motocicletas" element={<MotocicletasPage />} />
      </Route>
      
      {/* Redirect for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App component
function App() {
  return (
    <ConfigProvider>
      <AuthProvider>
        <LanguageProvider>
          <AntApp>
            <PublicRoutes />
          </AntApp>
        </LanguageProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;