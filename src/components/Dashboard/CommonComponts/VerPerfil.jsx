import React, { useState, useEffect } from 'react';
import Modal from './Modals';
import { Card, Avatar, Typography, Row, Col, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import DarkModeDivider from '../../../assets/Dashboard/LongDarkDivider.svg';
import LightModeDivider from '../../../assets/Dashboard/LongLightDivider.svg';

const { Title, Text } = Typography;

// Custom useMediaQuery hook
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  
  return matches;
};

// Responsive container with adaptive padding
const ProfileContainer = styled(motion.div)`
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 15px 10px;
  }
`;

// Responsive profile header
const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

// Responsive status badges
const StatusBadges = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
  
  @media (max-width: 480px) {
    flex-direction: ${props => props.$badges > 2 ? 'column' : 'row'};
    gap: ${props => props.$badges > 2 ? '8px' : '10px'};
    align-items: center;
  }
`;

// Consistent text styling with responsive sizes
const DetailLabel = styled(Text)`
  color: #8c8c8c;
  display: block;
  margin-bottom: 4px;
  
  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 2px;
  }
`;

const DetailValue = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  word-break: break-word;
  
  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 1.3;
  }
`;

const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const PasswordValueContainer = styled.div`
  min-width: 140px;
  
  @media (max-width: 480px) {
    min-width: 120px;
  }
`;

const StyledModal = styled(Modal)`
  border: 1px solid ${props => props.theme?.token?.subtitleBlack || '#635BFF'};
`;

// Responsive divider
const CustomDivider = styled.div`
  width: 100%;
  margin: 30px 0;
  display: flex;
  justify-content: center;
  
  img {
    width: 100%;
    height: auto;
    max-height: 45px;
    
    @media (max-width: 768px) {
      max-height: 35px;
    }
  }
  
  @media (max-width: 480px) {
    margin: 20px 0;
  }
`;

// Responsive tags
const CustomTag = styled.div`
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 14.5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  min-width: 130px;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 3px 10px;
    min-width: 90px;
  }
`;

const ActiveTag = styled(CustomTag)`
  background-color: #DCFCE7;
  color: #17803D;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const InactiveTag = styled(CustomTag)`
  background-color: #FFE4E6;
  color: #BE123C;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const RoleTag = styled(CustomTag)`
  background-color: ${props =>
    `${props.theme?.token?.colorPrimary || "#7B5ADB"}40`
  };
  color: ${props =>
    props.theme?.token?.colorPrimary || "#7B5ADB"
  };
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

// Row para desktop con 2 columnas
const DesktopRow = styled(Row)`
  @media (max-width: 480px) {
    display: none;
  }
`;

// Grid para mobile con 2 columnas
const MobileGrid = styled.div`
  display: none;
  
  @media (max-width: 480px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    width: 100%;
  }
`;

const ResponsiveAvatar = styled(Avatar)`
  width: 140px !important; // Increased from 100px
  height: 140px !important; // Increased from 100px
  line-height: 140px !important; // Increased from 100px
  
  @media (max-width: 480px) {
    width: 100px !important; // Increased from 80px
    height: 100px !important; // Increased from 80px
    line-height: 100px !important; // Increased from 80px
    
    .ant-avatar-string {
      line-height: 100px !important;
      font-size: 40px !important; // Increased from 32px
    }
  }
`;

const ResponsiveTitle = styled(Title)`
  @media (max-width: 480px) {
    font-size: 20px !important;
    margin-top: 12px !important;
  }
`;

const FieldContainer = styled(motion.div)`
  margin-bottom: ${props => props.isMobile ? '10px' : '16px'};
`;

const VerPerfil = ({ visible, onClose, currentUser, isOwnProfile = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { currentTheme } = useTheme();
  const isVisible = visible;
  const isMobile = useMediaQuery("(max-width: 480px)");
  const { currentUser: authUser } = useAuth();
  const userData = isOwnProfile ? authUser : currentUser;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const renderDivider = () => {
    const dividerSrc = currentTheme === 'themeDark' ? DarkModeDivider : LightModeDivider;
    return (
      <CustomDivider>
        <img src={dividerSrc} alt="divider" />
      </CustomDivider>
    );
  };

  const renderFields = (fields) => {
    if (isMobile) {
      return (
        <MobileGrid>
          {fields.map((field, idx) => (
            <div key={idx}>
              <FieldContainer isMobile={isMobile} variants={itemVariants}>
                <DetailLabel>{field.label}</DetailLabel>
                <DetailValue>{field.value}</DetailValue>
              </FieldContainer>
            </div>
          ))}
        </MobileGrid>
      );
    } else {
      return (
        <DesktopRow gutter={[24, 16]}>
          {fields.map((field, idx) => (
            <Col key={idx} span={12}>
              <FieldContainer isMobile={isMobile} variants={itemVariants}>
                <DetailLabel>{field.label}</DetailLabel>
                <DetailValue>{field.value}</DetailValue>
              </FieldContainer>
            </Col>
          ))}
        </DesktopRow>
      );
    }
  };

  const renderAdminOrEmpleadoProfile = () => {
    // Force the status to be active when viewing own profile from dropdown
    const isActive = isOwnProfile ? true : (
      userData?.estado?.toUpperCase() === "ACTIVO" || 
      userData?.status?.toUpperCase() === "ACTIVO"
    );
    
    const fields = [
      { label: "Cédula", value: userData?.datosPersonales?.cedula || "---" },
      { label: "Email", value: userData?.correo || "---@mototrack.com" },
      { label: "Teléfono", value: userData?.datosPersonales?.telefono || "---" },
      { label: "Ubicación", value: `${userData?.datosPersonales?.ubicacion?.direccion + ' ' + userData?.datosPersonales?.ubicacion?.municipio?.nombre + ' ' + userData?.datosPersonales?.ubicacion?.provincia?.nombre}` || "Sede Central" },
      { label: "Estado", value: isActive ? "Activo" : userData?.estado }, // Agregar campo de estado
      { label: "Fecha de registro", value: userData?.fechaCreacion ? new Date(userData.fechaCreacion).toLocaleDateString() : "---" },
      { 
        label: "Cargo", 
        value: userData?.datosPersonales?.tipoPersona?.nombre|| "No especificado" 
      },
      { 
        label: "Tipo de usuario", 
        value: userData?.tipoUsuario?.nombre|| "No especificado" 
      }
    ];
    
    return (
      <ProfileContainer initial="hidden" animate="visible" variants={containerVariants}>
        <ProfileHeader>
          <motion.div variants={itemVariants}>
            <ResponsiveAvatar 
              size={isMobile ? 70 : 100} 
              src={userData?.ftPerfil || userData?.avatar} 
              icon={<UserOutlined />}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ResponsiveTitle level={3}>
              {userData?.firstName || userData?.nombres} {userData?.lastName || userData?.apellidos}
            </ResponsiveTitle>
          </motion.div>
          <StatusBadges $badges={2}>
            <motion.div variants={itemVariants}>
              {isActive ? (
                <ActiveTag>Activo</ActiveTag>
              ) : (
                <InactiveTag>{userData?.estado}</InactiveTag>
              )}
            </motion.div>
            <motion.div variants={itemVariants}>
              <RoleTag>
                {userData?.tipoUsuario?.nombre|| "No especificado"}
              </RoleTag>
            </motion.div>
          </StatusBadges>
        </ProfileHeader>
        
        {renderDivider()}
        {renderFields(fields)}
      </ProfileContainer>
    );
  };

  const renderCiudadanoProfile = () => {
    const fields = [
      { label: "Email", value: userData?.correo || "email@gmail.com" },
      { label: "Fecha de registro", value: userData?.fechaCreacion ? new Date(userData?.fechaCreacion).toLocaleDateString() : "---" }
    ];
    
    return (
      <ProfileContainer initial="hidden" animate="visible" variants={containerVariants}>
        <ProfileHeader>
          <motion.div variants={itemVariants}>
            <ResponsiveAvatar 
              size={isMobile ? 70 : 100} 
              src={userData?.ftPerfil || userData?.avatar} 
              icon={<UserOutlined />}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ResponsiveTitle level={3} style={{ marginTop: isMobile ? 12 : 16, marginBottom: isMobile ? 6 : 8 }}>
              {userData?.firstName || userData?.nombres} {userData?.lastName || userData?.apellidos}
            </ResponsiveTitle>
          </motion.div>
          <StatusBadges $badges={2}>
            <motion.div variants={itemVariants}>
              <ActiveTag>Activo</ActiveTag>
            </motion.div>
            <motion.div variants={itemVariants}>
              <RoleTag>Ciudadano</RoleTag>
            </motion.div>
          </StatusBadges>
        </ProfileHeader>
        
        {renderDivider()}
        {renderFields(fields)}
      </ProfileContainer>
    );
  };

  if (!userData) return null;

  return (
    <StyledModal 
      show={isVisible} 
      onClose={onClose} 
      width={isMobile ? "95%" : "600px"} 
      height="auto"
    >
      <Card
        variant="borderless"
        style={{
          boxShadow: 'none',
          backgroundColor: 'transparent',
          padding: isMobile ? '5px' : '20px'
        }}
      >
        {userData?.role === "ciudadano" 
          ? renderCiudadanoProfile() 
          : renderAdminOrEmpleadoProfile()
        }
      </Card>
    </StyledModal>
  );
};

export default VerPerfil;
