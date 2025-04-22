import React, { useState, useEffect } from 'react';
import { Layout, Menu, Drawer } from 'antd';
import { 
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileSearchOutlined,
  FileProtectOutlined,
  IdcardOutlined,
  HomeOutlined,
  FileAddOutlined    // Added this import for the registration icon
} from '@ant-design/icons';
import styled, { ThemeConsumer } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { getTranslation } from '../../../utils/translations';
import LoadingOverlay from '../../LoadingOverlay';

const { Sider } = Layout;

// Add this function before your styled components
const getContrastColor = (primaryColor) => {
  const hex = primaryColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.7 ? '#000000' : '#ffffff';
};

// Sider principal con estilos y colores temáticos
const StyledSider = styled(Sider)`
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  box-shadow: ${props => (props.theme.currentTheme === 'themeDark' 
    ? '0 2px 8px rgba(255, 255, 255, 0.05)' 
    : '0 2px 8px rgba(0, 0, 0, 0.08)')};
  z-index: 1001;
  background-color: ${props => props.theme.token.sidebarBg} !important;
  border-right: 1px solid ${props => (props.theme.currentTheme === 'themeDark' 
    ? 'rgba(255, 255, 255, 0.06)' 
    : 'rgba(0, 0, 0, 0.06)')};

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .ant-menu {
    background-color: ${props => props.theme.token.sidebarBg} !important;
    color: ${props => props.theme.token.subtitleColor};
    border-right: none !important;
  }
  
  // Elementos del menú con colores temáticos
  .ant-menu-item {
    font-size: 15px;
    height: 50px;
    line-height: 50px;
    color: ${props => props.theme.token.subtitleColor};
    margin: 4px 12px !important;
    border-radius: 10px;
    transition: all 0.2s ease;
    
    .anticon {
      font-size: 16px;
      margin-right: 12px;
      color: ${props => props.theme.token.subtitleColor};
      transition: all 0.2s ease;
    }
    
    &:hover {
      color: ${props => getContrastColor(props.theme.token.colorPrimary)} !important;
      background-color: ${props => `${props.theme.token.colorPrimary}CC`} !important;
      width: 85% !important;
      margin-left: auto !important; 
      margin-right: auto !important;
      border-radius: 12px !important;
      font-weight: 500 !important;
      
      .anticon {
        color: ${props => getContrastColor(props.theme.token.colorPrimary)} !important;
      }
    }
  }
  
  // Estilos para elementos seleccionados
  .ant-menu-item-selected {
    background-color: ${props => props.theme.token.colorPrimary} !important;
    color: ${props => getContrastColor(props.theme.token.colorPrimary)} !important;
    font-weight: 600 !important;
    font-size: 16px !important;
    padding-left: 18px;
    width: 85% !important;
    margin-left: auto !important;
    margin-right: auto !important;
    border-radius: 12px !important;
   
    .anticon {
      font-size: 18px !important;
      color: ${props => getContrastColor(props.theme.token.colorPrimary)} !important;
    }
    
    &:after {
      display: none;
    }
  }
  
  // Estilos para el estado colapsado
  &.ant-layout-sider-collapsed {
    .ant-menu-item {
      padding-left: 24px !important;
      border-radius: 12px !important;
      margin: 4px auto !important;
      width: 60px !important;
      
      .anticon {
        font-size: 18px;
        margin-right: 0;
      }
    }
    
    .ant-menu-item-selected {
      background-color: ${props => props.theme.token.colorPrimary} !important;
      width: 60px !important;
      
      .anticon {
        color: ${props => props.theme.token.contentBg} !important;
      }
    }
  }
  
  // Ajustes para el menú colapsado inline de Ant Design
  .ant-menu-inline-collapsed {
    width: 100% !important;
    
    .ant-menu-item {
      padding: 0 calc(50% - 16px) !important;
      
      .anticon {
        margin: 0;
        font-size: 18px;
        line-height: 50px;
      }
    }
    
    .ant-menu-item-selected {
      background-color: ${props => props.theme.token.colorPrimary} !important;
      
      .anticon {
        color: ${props => props.theme.token.contentBg} !important;
      }
    }
  }
  
  // Ocultar barra de desplazamiento
  &::-webkit-scrollbar {
    display: none;
  }
  
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    display: none; // Ocultar sidebar fijo en móvil
  }
  
  @media (min-width: 1600px) {
    .ant-menu-item {
      font-size: 16px;
      height: 54px;
      line-height: 54px;
    }
  }
`;

// Drawer móvil
const MobileDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: ${props => props.theme.token.sidebarBg};
  }
  
  .ant-drawer-content {
    background-color: ${props => props.theme.token.sidebarBg};
  }
  
  .ant-drawer-content-wrapper {
    width: 250px !important;
  }
  
  // Apply the same menu styling as in StyledSider
  .ant-menu {
    background-color: ${props => props.theme.token.sidebarBg} !important;
    color: ${props => props.theme.token.subtitleColor};
    border-right: none !important;
  }
  
  .ant-menu-item {
    font-size: 15px;
    height: 50px;
    line-height: 50px;
    color: ${props => props.theme.token.subtitleColor};
    margin: 4px 12px !important;
    border-radius: 10px;
    transition: all 0.2s ease;
    
    .anticon {
      font-size: 16px;
      margin-right: 12px;
      color: ${props => props.theme.token.subtitleColor};
      transition: all 0.2s ease;
    }
    
    &:hover {
      color: ${props => props.theme.token.contentBg} !important;
      background-color: ${props => `${props.theme.token.colorPrimary}CC`} !important;
      width: 85% !important;
      margin-left: auto !important; 
      margin-right: auto !important;
      border-radius: 12px !important;
      font-weight: 500 !important;
      
      .anticon {
        color: ${props => props.theme.token.contentBg} !important;
      }
    }
  }
  
  .ant-menu-item-selected {
    background-color: ${props => props.theme.token.colorPrimary} !important;
    color: ${props => props.theme.token.contentBg} !important;
    font-weight: 600 !important;
    font-size: 16px !important;
    padding-left: 18px;
    width: 85% !important;
    margin-left: auto !important;
    margin-right: auto !important;
    border-radius: 12px !important;
   
    .anticon {
      font-size: 18px !important;
      color: ${props => props.theme.token.contentBg} !important;
    }
    
    &:after {
      display: none;
    }
  }
  
  // Special styling for logout item in mobile - make this VERY specific
  .logout-menu-item {
    color: ${props => props.theme.token.subtitleColor} !important;
    background-color: transparent !important;
    margin: 4px 12px !important;
    width: calc(100% - 24px) !important;
    position: static !important;
    
    .anticon {
      color: ${props => props.theme.token.subtitleColor} !important;
    }
    
    // Simple hover effect - just change text color to red
    &:hover {
      color: #ff4d4f !important;
      background-color: transparent !important;
      width: calc(100% - 24px) !important;
      margin: 4px 12px !important;
      transform: none !important;
      position: static !important;
      font-weight: normal !important;
      
      .anticon {
        color: #ff4d4f !important;
      }
    }
    
    // Prevent selected state styling
    &.ant-menu-item-selected {
      background-color: transparent !important;
      color: ${props => props.theme.token.subtitleColor} !important;
      
      .anticon {
        color: ${props => props.theme.token.subtitleColor} !important;
      }
      
      &:hover {
        color: #ff4d4f !important;
        
        .anticon {
          color: #ff4d4f !important;
        }
      }
    }
  }
`;

// Contenedor del logo
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  height: 90px;
  background: ${props => props.theme.token.sidebarBg};
  margin-bottom: 10px;
 
  img {
    max-height: ${props => props.$collapsed ? '80px' : '70px'};
    max-width: 100%;
    transition: all 0.3s ease;
  }
`;

// Contenedor para los elementos del menú
const MenuContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: ${props => props.theme.token.sidebarBg};
  
  .ant-menu {
    width: 100%;
  }
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  // Ensure consistency in both desktop and mobile
  .ant-drawer & {
    background-color: ${props => props.theme.token.sidebarBg} !important;
  }
`;

// Contenedor para botón de cierre de sesión
const LogoutContainer = styled.div`
  margin-top: auto;
  padding-bottom: 16px;
  background-color: ${props => props.theme.token.sidebarBg};
  width: 100%;
  
  // Special styling for logout menu item
  .logout-menu-item {
    color: ${props => props.theme.token.subtitleColor} !important;
    margin: 4px 12px !important;
    width: calc(100% - 24px) !important;
    position: static !important;
    background-color: transparent !important;
    
    .anticon {
      color: ${props => props.theme.token.subtitleColor} !important;
    }
    
    // Simple hover effect - just change text color to red
    &:hover {
      color: #ff4d4f !important;
      background-color: transparent !important;
      width: calc(100% - 24px) !important;
      margin: 4px 12px !important;
      font-weight: normal !important;
      transform: none !important;
      position: static !important;
      
      .anticon {
        color: #ff4d4f !important;
      }
      
      // Prevent any position changes
      left: auto !important;
      right: auto !important;
      top: auto !important;
      bottom: auto !important;
    }
    
    // Prevent selected state styling
    &.ant-menu-item-selected {
      background-color: transparent !important;
      color: ${props => props.theme.token.subtitleColor} !important;
      font-weight: normal !important;
      
      .anticon {
        color: ${props => props.theme.token.subtitleColor} !important;
      }
      
      &:hover {
        color: #ff4d4f !important;
        background-color: transparent !important;
        
        .anticon {
          color: #ff4d4f !important;
        }
      }
    }
  }
`;

// Divisor del menú - Update this styled component for better visibility in collapsed mode
const DividerImage = styled.img`
  width: ${props => props.$collapsed ? '60%' : '75%'};
  margin: ${props => props.$collapsed ? '12px auto' : '20px auto'};
  display: block;
  opacity: ${props => props.$collapsed ? 0.8 : 1};
  transition: all 0.3s ease;
`;

// Botón de colapso
const CollapseToggle = styled.div`
  position: fixed; 
  top: 70px;
  left: ${props => props.$collapsed ? '60px' : '230px'};
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${props => props.theme.token.colorPrimary};
  color: ${props => {
    // Convert hex to RGB and check luminance
    const hex = props.theme.token.colorPrimary.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.7 ? '#000000' : '#ffffff';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px ${props => `${props.theme.token.colorPrimary}66`};
  z-index: 2000;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => {
      const color = props.theme.token.colorPrimary;
      return color === '#000000' ? '#333333' : `${color}DD`;
    }};
    transform: scale(1.05);
    box-shadow: 0 6px 16px ${props => `${props.theme.token.colorPrimary}80`};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// Botón móvil
const MobileToggle = styled.div`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${props => props.theme.token.colorPrimary};
  color: white;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px ${props => props.theme.currentTheme === 'themeDark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.15)'};
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

// Menú del sidebar
const SidebarMenu = ({ items, selectedKeys, onClick }) => {
  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={selectedKeys}
      onClick={onClick}
      items={items.map(item => {
        // Add a special class for the logout item
        if (item.key === 'logout') {
          return {
            ...item,
            className: 'logout-menu-item'
          };
        }
        return item;
      })}
      defaultSelectedKeys={['dashboard']}
    />
  );
};

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { language } = useLanguage();
  const { currentUser, logout } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [pageLoading, setPageLoading] = useState(false);

  // Detectar cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (mobile && !collapsed) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [collapsed, setCollapsed]);

  // Actualizar la selección según la ruta
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const currentPath = pathSegments[pathSegments.length - 1];
    if (currentPath === 'admin' || currentPath === 'empleado' || currentPath === 'ciudadano' || currentPath === '') {
      setSelectedKeys(['dashboard']);
    } else {
      setSelectedKeys([currentPath]);
    }
  }, [location]);

  // Generar elementos de menú según el rol
  const getMenuItems = () => {
    const baseItems = [
      {
        key: 'dashboard',
        icon: <HomeOutlined />,
        label: getTranslation('sidebar.dashboard', language)
      }
    ];
    // Elementos para administrador
    if (currentUser?.role === 'administrador') {
      return [
        ...baseItems,
        {
          key: 'solicitudes',
          icon: <FileSearchOutlined />,
          label: getTranslation('sidebar.requests', language)
        },
        {
          key: 'empleados',
          icon: <IdcardOutlined />,
          label: getTranslation('sidebar.employees', language)
        }
      ];
    }
    
    // Elementos para empleado
    if (currentUser?.role === 'empleado') {
      return [
        ...baseItems,
        {
          key: 'gestion',
          icon: <FileSearchOutlined />,
          label: getTranslation('sidebar.management', language)
        }
      ];
    }
    
    // Elementos para ciudadano
    return [
      ...baseItems,
      {
        key: 'registrar',
        icon: <FileAddOutlined />,
        label: getTranslation('sidebar.register', language)
      },
      {
        key: 'motocicletas',
        icon: <FileProtectOutlined />,
        label: getTranslation('sidebar.motorcycles', language)
      }
    ];
  };

  // Navegación del menú
  const handleMenuClick = (e) => {
    const key = e.key;
    
    if (key === 'logout') {
      logout();
      return;
    }
    
    // Mostrar loading overlay antes de navegar
    setPageLoading(true);
    
    let path = '';
    if (currentUser?.role === 'administrador') {
      path = `/panel/admin${key === 'dashboard' ? '' : `/${key}`}`;
    } else if (currentUser?.role === 'empleado') {
      path = `/panel/empleado${key === 'dashboard' ? '' : `/${key}`}`;
    } else {
      // Para ciudadano
      path = `/panel/ciudadano${key === 'dashboard' ? '' : `/${key}`}`;
    }
    
    console.log(`Navegando a: ${path}`);
    setSelectedKeys([key]);
    
    // Navegar y ocultar el loading overlay después de un breve retraso
    // para simular el tiempo de carga
    navigate(path);
    
    // Simular tiempo de carga (puedes eliminar esto en producción)
    setTimeout(() => {
      setPageLoading(false);
    }, 600); // Ajusta este tiempo según tus necesidades
    
    if (isMobile) {
      setMobileDrawerVisible(false);
    }
  };

  // Control del sidebar
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const toggleMobileDrawer = () => setMobileDrawerVisible(!mobileDrawerVisible);
  
  // Contenido del sidebar
  const sidebarContent = (themeToUse) => (
    <>
      <LogoContainer $collapsed={collapsed}>
        {themeToUse.currentTheme === 'themeDark' 
          ? <img src="https://res.cloudinary.com/dx87s3lws/image/upload/v1745288919/MotoTrackInvertedLogo_o0c2nj.png" alt="MotoTrack" />
          : <img src="https://res.cloudinary.com/dx87s3lws/image/upload/v1745288750/MotoTrackLogo-2_tjislj.png" alt="MotoTrack" />
        }
      </LogoContainer>
      
      {/* Reemplazar el MenuDivider por la imagen SVG según el tema y estado de colapso */}
      {themeToUse.currentTheme === 'themeDark' 
        ? <DividerImage 
            src={collapsed 
              ? "https://res.cloudinary.com/dx87s3lws/image/upload/v1745288996/CollapseDividerDarkMode_dct1ta.svg" 
              : "https://res.cloudinary.com/dx87s3lws/image/upload/v1745289032/DarkModeDivider_jgkszd.svg"} 
            alt="divider" 
            $collapsed={collapsed} 
          />
        : <DividerImage 
            src={collapsed 
              ? "https://res.cloudinary.com/dx87s3lws/image/upload/v1745289126/CollapseDividerLightMode_uggfvs.svg" 
              : "https://res.cloudinary.com/dx87s3lws/image/upload/v1745289137/LightModeDivider_casldd.svg"} 
            alt="divider" 
            $collapsed={collapsed} 
          />
      }
      
      <MenuContainer>
        <SidebarMenu
          items={getMenuItems()}
          selectedKeys={selectedKeys}
          onClick={handleMenuClick}
        />
      </MenuContainer>
      
      {/* Reemplazar el segundo MenuDivider también */}
      {themeToUse.currentTheme === 'themeDark' 
        ? <DividerImage 
            src={collapsed 
              ? "https://res.cloudinary.com/dx87s3lws/image/upload/v1745288996/CollapseDividerDarkMode_dct1ta.svg" 
              : "https://res.cloudinary.com/dx87s3lws/image/upload/v1745289032/DarkModeDivider_jgkszd.svg"}
            alt="divider" 
            $collapsed={collapsed} 
          />
        : <DividerImage 
            src={collapsed 
              ? "https://res.cloudinary.com/dx87s3lws/image/upload/v1745289126/CollapseDividerLightMode_uggfvs.svg" 
              : "https://res.cloudinary.com/dx87s3lws/image/upload/v1745289137/LightModeDivider_casldd.svg"} 
            alt="divider" 
            $collapsed={collapsed} 
          />
      }
      
      <LogoutContainer>
        <SidebarMenu
          items={[
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: getTranslation('sidebar.logout', language),
              className: 'logout-menu-item'
            }
          ]}
          onClick={handleMenuClick}
          selectedKeys={[]} // Make sure logout is never selected
        />
      </LogoutContainer>
    </>
  );
  
  return (
    <ThemeConsumer>
      {themeFromContext => {
        // Fallback theme que utilizará valores por defecto si theme.token es undefined
        const safeTheme = {
          currentTheme: themeFromContext?.currentTheme || theme?.currentTheme || 'themeLight',
          token: {
            sidebarBg: themeFromContext?.token?.sidebarBg || theme?.token?.sidebarBg || "#F9F9F9",
            contentBg: themeFromContext?.token?.contentBg || theme?.token?.contentBg || "#FFFFFF",
            subtitleColor: themeFromContext?.token?.subtitleColor || theme?.token?.subtitleColor || "#666666",
            titleColor: themeFromContext?.token?.titleColor || theme?.token?.titleColor || "#000000",
            subtitleBlack: themeFromContext?.token?.subtitleBlack || theme?.token?.subtitleBlack || "rgba(0, 0, 0, 0.45)",
            colorPrimary: themeFromContext?.token?.colorPrimary || theme?.token?.colorPrimary || "#635BFF"
          }
        };

        return (
          <>
            {/* Agrega el LoadingOverlay aquí */}
            <LoadingOverlay isLoading={pageLoading} text="Cargando página..." />
            
            <StyledSider
              theme={safeTheme}
              collapsed={collapsed}
              width={250}
              trigger={null}
              collapsedWidth={80}
            >
              {sidebarContent(safeTheme)}
            </StyledSider>
            
            <CollapseToggle 
              theme={safeTheme}
              $collapsed={collapsed} 
              onClick={toggleCollapsed}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </CollapseToggle>
            
            <MobileDrawer
              theme={safeTheme}
              placement="left"
              closable={false}
              onClose={() => setMobileDrawerVisible(false)}
              open={mobileDrawerVisible}
              styles={{ body: { padding: 0 } }}
            >
              {sidebarContent(safeTheme)}
            </MobileDrawer>
            
            <MobileToggle theme={safeTheme} onClick={toggleMobileDrawer}>
              <MenuUnfoldOutlined />
            </MobileToggle>
          </>
        );
      }}
    </ThemeConsumer>
  );
};

export default Sidebar;