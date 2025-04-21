import React, { useState } from 'react';
import { Layout as AntLayout } from 'antd';
import styled, { keyframes } from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '../components/Dashboard/Layout/Header';
import Sidebar from '../components/Dashboard/Layout/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const { Content } = AntLayout;

const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
  background-color: ${props => props.theme.token.contentBg};
`;

// Define the slide-in animation with more exaggerated effect
const slideInFromLeft = keyframes`
  0% {
    transform: translateX(-100px) scale(0.95);
    opacity: 0;
  }
  70% {
    transform: translateX(10px) scale(1.01);
    opacity: 1;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
`;

// Modifica el StyledContent para mejor espaciado y centrado
const StyledContent = styled(Content)`
  margin-left: ${props => props.$collapsed ? '100px' : '270px'}; /* Aumentado 20px */
  margin-right: 32px; /* Añadido margen derecho */
  padding: 32px; /* Aumentado el padding */
  background-color: ${props => props.theme.token.contentBg};
  min-height: calc(100vh - 64px);
  transition: margin-left 0.3s cubic-bezier(0.2, 0, 0, 1); /* Animación mejorada */
  margin-top: 64px; /* Mantiene el contenido debajo del header */
  max-width: 1600px; /* Limita el ancho máximo */
  
  /* Añadimos la animación de entrada más exagerada */
  & > * {
    animation: ${slideInFromLeft} 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.4);
    transform-origin: left center;
  }
  
  @media (max-width: 768px) {
    margin-left: 16px;
    margin-right: 16px;
    padding: 24px;
  }
  
  @media (min-width: 1920px) {
    /* Para centrar en pantallas muy grandes */
    margin-left: auto;
    margin-right: auto;
    padding-left: ${props => props.$collapsed ? '100px' : '270px'};
    transition: padding-left 0.3s cubic-bezier(0.2, 0, 0, 1); /* Animación para grandes pantallas */
  }
`;

// Actualiza el MainLayout para posicionar correctamente el header
const MainLayout = styled(AntLayout)`
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1); /* Animación más suave */
  background-color: ${props => props.theme.token.contentBg};
  position: relative; // Añadido para posicionamiento correcto
`;

// Ajustar el Header para que mantenga el mismo espaciado
const StyledHeader = styled(Header)`
  position: fixed;
  width: calc(100% - ${props => props.$collapsed ? '100px' : '270px'} - 32px);
  right: 32px;
  z-index: 1000;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1); /* Animación añadida */
  
  @media (max-width: 768px) {
    width: calc(100% - 32px);
    right: 16px;
    left: 16px;
  }
  
  @media (min-width: 1920px) {
    /* Para grandes pantallas */
    max-width: 1600px;
    left: 50%;
    transform: translateX(-50%);
    padding-left: ${props => props.$collapsed ? '100px' : '270px'};
    transition: padding-left 0.3s cubic-bezier(0.2, 0, 0, 1); /* Animación para padding */
  }
`;

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser } = useAuth();
  const { theme, currentTheme } = useTheme();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Redirect if not authenticated
  if (!currentUser) {
    return null; // Esto se manejará en la ruta protegida
  }

  return (
    <div className="dashboard-layout" data-theme={currentTheme}>
      <StyledLayout>
        <Sidebar 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          theme={theme} // Se pasa el theme completo al Sidebar
        />
        
        <MainLayout>
          {/* Usar el StyledHeader en lugar de Header */}
          <StyledHeader 
            $collapsed={collapsed} // Nota: usar $collapsed aquí también
            collapsed={collapsed} 
            toggleCollapsed={toggleCollapsed} 
            theme={theme} // Se pasa el theme completo al Header
          />
          
          <StyledContent $collapsed={collapsed}>
            <Outlet />
          </StyledContent>
        </MainLayout>
      </StyledLayout>
    </div>
  );
};

export default Layout;