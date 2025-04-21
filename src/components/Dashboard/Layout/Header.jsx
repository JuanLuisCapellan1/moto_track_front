import React, { useState, useEffect } from 'react';
import { Layout, Typography, Avatar, Dropdown, Badge, Menu, Button, Divider, Switch, theme } from 'antd';
import { 
  BellFilled, 
  UserOutlined,
  DownOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import ProfileDropdown from './HeaderComponents/ProfileDropdown';
import { useLanguage } from '../../../context/LanguageContext';
import { getTranslation } from '../../../utils/translations';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

// Se utiliza un transient prop ($sidebarCollapsed) para evitar que se pase al DOM
const StyledHeader = styled(AntHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px 0 32px; // Se incrementa el padding a la derecha
  background: ${props => props.theme.token.contentBg};
  backdrop-filter: blur(10px);
  height: 80px;
  position: fixed;
  top: 0;
  right: 0;
  left: ${props => props.$sidebarCollapsed ? '80px' : '250px'};
  z-index: 1000;
  transition: all 0.2s;
  
  @media (max-width: 768px) {
    left: 0;
    padding: 0 16px;
  }
  
  @media (min-width: 1600px) {
    padding: 0 64px 0 48px;
    height: 90px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 480px) {
    max-width: 60%;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 480px) {
    gap: 5px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

const PageTitle = styled(Title)`
  margin: 0 !important;
  font-size: 20px !important;
  line-height: 1.2 !important;
  color: ${props => props.theme.token.titleColor} !important;
  
  @media (max-width: 768px) {
    font-size: 18px !important;
  }
  
  @media (max-width: 480px) {
    font-size: 16px !important;
  }
  
  @media (min-width: 1600px) {
    font-size: 24px !important;
  }
`;

const PageSubtitle = styled(Text)`
  font-size: 14px;
  color: ${props => props.theme.token.subtitleBlack};
  margin-top: 4px;
  
  @media (max-width: 480px) {
    font-size: 12px;
    display: none;
  }
  
  @media (min-width: 1600px) {
    font-size: 16px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const UserName = styled(Text)`
  font-weight: 500;
  line-height: 1.2;
  color: ${props => props.theme.token.titleColor};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserRole = styled(Text)`
  color: ${props => props.theme.token.subtitleBlack};
  font-size: 12px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledDivider = styled(Divider)`
  height: 40px;
  margin: 0 12px;
  
  @media (max-width: 480px) {
    margin: 0 5px;
  }
`;

const NotificationBadge = styled(Badge)`
  cursor: pointer;
  
  .ant-badge-count {
    border-radius: 10px;
    padding: 0 6px;
  }
`;

const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  transition: background-color 0.3s;
  border: 1px solid ${props => props.theme.token.subtitleBlack};
  background-color: transparent;
  
  &:hover {
    background-color: ${props => 
      props.theme.currentTheme === 'themeDark' 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.03)'};
  }
  
  .anticon {
    color: ${props => props.theme.token.titleColor};
    font-size: 20px;
  }
`;

const DropdownArrow = styled(DownOutlined)`
  font-size: 12px;
  margin-left: 10px;
  margin-top: -2px;
  color: ${props => props.theme.token.subtitleBlack};
`;

const UserAvatar = styled(Avatar)`
  border: 2px solid ${props => props.theme.token.colorPrimary}100;
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
  
  @media (min-width: 1600px) {
    width: 44px;
    height: 44px;
  }
`;

const Header = ({ collapsed }) => {
  const { language } = useLanguage();
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');
  const [pageSubtitle, setPageSubtitle] = useState('');

  useEffect(() => {
    const path = location.pathname;
    
    if (path.includes('/panel/admin')) {
      setPageTitle(getTranslation('header.titles.adminPanel', language));
      setPageSubtitle(getTranslation('header.subtitles.adminSystem', language));
    } else if (path.includes('/panel/empleado')) {
      setPageTitle(getTranslation('header.titles.employeePanel', language));
      setPageSubtitle(getTranslation('header.subtitles.employeeServices', language));
    } else if (path.includes('/panel/ciudadano')) {
      setPageTitle(getTranslation('header.titles.controlPanel', language));
      setPageSubtitle(getTranslation('header.subtitles.motorcycleManagement', language));
    } else if (path.includes('/perfil')) {
      setPageTitle(getTranslation('header.titles.profile', language));
      setPageSubtitle(getTranslation('header.subtitles.personalInfo', language));
    } else if (path.includes('/vehiculos')) {
      setPageTitle(getTranslation('header.titles.vehicles', language));
      setPageSubtitle(getTranslation('header.subtitles.registeredMotorcycles', language));
    } else if (path.includes('/tramites')) {
      setPageTitle(getTranslation('header.titles.transactions', language));
      setPageSubtitle(getTranslation('header.subtitles.requestsManagement', language));
    } else if (path.includes('/multas')) {
      setPageTitle(getTranslation('header.titles.fines', language));
      setPageSubtitle(getTranslation('header.subtitles.finesPayment', language));
    } else if (path.includes('/usuarios')) {
      setPageTitle(getTranslation('header.titles.userManagement', language));
      setPageSubtitle(getTranslation('header.subtitles.systemUsers', language));
    } else {
      setPageTitle(getTranslation('header.titles.controlPanel', language));
      setPageSubtitle(getTranslation('header.subtitles.welcome', language));
    }
  }, [location, language]);
  
  // Se utiliza el componente ProfileDropdown para el menú de usuario
  const userMenu = (
    <ProfileDropdown currentUser={currentUser} logout={logout} />
  );

  return (
    <StyledHeader $sidebarCollapsed={collapsed}>
      <HeaderLeft>
        <TitleContainer>
          <PageTitle level={4}>{pageTitle}</PageTitle>
          <PageSubtitle>{pageSubtitle}</PageSubtitle>
        </TitleContainer>
      </HeaderLeft>
      
      <HeaderRight>
        {/* <Dropdown
          dropdownRender={() => null 
          placement="bottomRight"
          trigger={['click']}
        >
          <NotificationContainer>
            <NotificationBadge count={0}>
              <BellFilled style={{ fontSize: '20px' }} />
            </NotificationBadge>
          </NotificationContainer>
        </Dropdown>
        
        <StyledDivider type="vertical" /> */}
        
        <Dropdown
          dropdownRender={() => userMenu}
          placement="bottomRight"
          trigger={['click']}
        >
          <UserInfo>
            <UserAvatar 
              src={currentUser?.ftPerfil} 
              icon={!currentUser?.ftPerfil && <UserOutlined />}
              size={40}
            />
            <UserDetails>
              <UserName>{currentUser?.nombres} {currentUser?.apellidos}</UserName>
              <UserRole>{currentUser?.role === 'administrador'
                ? 'Administrador'
                : currentUser?.role === 'empleado'
                  ? 'Empleado'
                  : 'Ciudadano'}</UserRole>
            </UserDetails>
            <DropdownArrow />
          </UserInfo>
        </Dropdown>
      </HeaderRight>
    </StyledHeader>
  );
};

export default Header;