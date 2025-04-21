import React, { useState, useEffect } from 'react';
import { Menu, Avatar, Typography, Divider, Popover, ColorPicker } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  EditOutlined,
  LockOutlined,
  GlobalOutlined,
  RightOutlined,
  SunOutlined,
  MoonOutlined
} from '@ant-design/icons';
import styled, { createGlobalStyle } from 'styled-components';
import { usePrimaryColor } from '../../../../context/PrimaryColorContext';
import { useTheme } from '../../../../context/ThemeContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { getTranslation } from '../../../../utils/translations';
import VerPerfil from '../../CommonComponts/VerPerfil';
// Import the password change component
import CambiarMiContraseña from './ProfileDropdownComponents.jsx/CambiarMiContraseña';
// Add this import at the top with the other imports
import EditarMiPerfil from './ProfileDropdownComponents.jsx/EditarMiPerfil';


// Add global styles to properly handle submenu on mobile
const GlobalStyles = createGlobalStyle`
  .color-submenu-responsive {
    @media (max-width: 576px) {
      position: fixed !important;
      left: 0 !important;
      right: 0 !important;
      top: auto !important;
      bottom: 0 !important;
      width: 100% !important;
      max-height: 70vh !important;
      overflow-y: auto !important;
      border-radius: 16px 16px 0 0 !important;
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15) !important;
      
      .ant-menu {
        max-height: 70vh !important;
        overflow-y: auto !important;
      }
    }
  }
`;

// Add this utility function at the top of your file (before the component)
const getContrastTextColor = (hexColor) => {
  // Remove '#' if present
  const hex = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.7 ? '#000000' : '#ffffff';
};

// User profile header styling
const UserProfileHeader = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: center;
  background: ${props => props.theme.currentTheme === 'themeDark' 
    ? 'rgba(255, 255, 255, 0)' 
    : 'rgba(255, 255, 255, 0.03)'};
  border-bottom: 1px solid ${props => props.theme.currentTheme === 'themeDark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.06)'};
  cursor: pointer;
  
  &:hover {
    background: ${props => props.theme.currentTheme === 'themeDark' 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.03)'};
  }
`;

const UserProfileAvatar = styled(Avatar)`
  width: 48px;
  height: 48px;
  border: 2px solid ${props => props.theme.token.colorPrimary};
  border: none;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserProfileName = styled(Typography.Text)`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 2px;
  color: ${props => props.theme.token.titleColor} !important;
`;

const UserProfileEmail = styled(Typography.Text)`
  font-size: 12px;
  color: ${props => props.theme.token.subtitleBlack} !important;
`;

const StyledMenuItem = styled(Menu.Item)`
  padding: 10px 16px;
  
  &:hover {
    background-color: ${props => props.theme.currentTheme === 'themeDark' 
      ? 'rgba(99, 91, 255, 0.15)' 
      : 'rgba(99, 91, 255, 0.05)'};
  }
  
  .anticon {
    font-size: 22px; // Increased from 18px
    margin-right: 10px;
  }
`;

const MenuDividerWrapper = styled.div`
  padding: 0 16px;
`;

const MenuItemContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const MenuItemTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.token.titleColor};
`;

const MenuItemSubtitle = styled.span`
  font-size: 12px;
  color: ${props => props.theme.token.subtitleBlack};
`;

const ColorDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 10px;
  display: inline-block;
`;

const ColorOption = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(99, 91, 255, 0.05);
  }
`;



const SubMenuTitle = styled.div`
  padding: 10px 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const BackButton = styled.div`
  margin-right: 10px;
  cursor: pointer;
  transform: rotate(180deg);
  display: inline-flex;
`;

// Primero, añade estos estilos responsive

// Menu contenedor responsive
const ResponsiveMenu = styled(Menu)`
  width: 260px;
  
  @media (max-width: 576px) {
    width: 100%;
    max-width: calc(100vw - 32px);
  }
`;

// ColorPicker responsive
const ResponsiveColorPicker = styled(ColorPicker)`
  width: 100%;
  
  .ant-color-picker-trigger {
    height: 36px;
  }
  
  @media (max-width: 576px) {
    .ant-color-picker-panel {
      max-width: calc(100vw - 48px);
    }
  }
`;

// Ajusta el MenuItem para mejor apariencia en móviles
const ResponsiveMenuItem = styled(Menu.Item)`
  @media (max-width: 576px) {
    padding: 12px 16px;
    
    .anticon {
      font-size: 20px;
    }
  }
`;





const ProfileDropdown = ({ currentUser, logout, visible, onVisibleChange }) => {
  const { language, changeLanguage } = useLanguage();
  const { primaryColor, setPrimaryColor } = usePrimaryColor();
  const { currentTheme, switchTheme } = useTheme();
  const isDarkMode = currentTheme === 'themeDark';
  const [customColor, setCustomColor] = useState('#DA4345');
  const [showColorSubMenu, setShowColorSubMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Modal states
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Reset to main menu when dropdown closes and reopens
  useEffect(() => {
    if (!visible) {
      setShowColorSubMenu(false);
    }
  }, [visible]);
  

  const toggleTheme = () => {
    // Check if current color is black or white before switching theme
    const isBlackOrWhite = 
      primaryColor.toLowerCase() === '#000000' || 
      primaryColor.toLowerCase() === '#ffffff';
    
    // Switch the theme first
    switchTheme();
    
    // Then update color if needed
    if (isBlackOrWhite) {
      // If going to dark mode, change black to white
      if (currentTheme !== 'themeDark') {
        setPrimaryColor('#FFFFFF');
      } 
      // If going to light mode, change white to black
      else {
        setPrimaryColor('#000000');
      }
    }
  };
  
  const handleColorChange = (color) => {
    setPrimaryColor(color);
  };
  
  const handleCustomColorChange = (color) => {
    setCustomColor(typeof color === 'string' ? color : color.toHexString());
  };
  
  const applyCustomColor = () => {
    setPrimaryColor(customColor);
  };

  const handleColorMenuClick = (e) => {
    if (isMobile) {
      // Stop propagation to prevent menu closing
      e.domEvent && e.domEvent.stopPropagation();
      // Prevent the dropdown from closing
      if (visible) {
        onVisibleChange(true);
      }
      // Show color submenu
      setShowColorSubMenu(true);
    }
  };

  const handleBackToMainMenu = () => {
    setShowColorSubMenu(false);
  };

  // Define a consistent set of color options for both mobile and desktop
  const colorOptions = [
    {
      key: 'color-morado',
      color: '#635BFF',
      label: isDarkMode => getTranslation('profile.color.purple', language)
    },
    {
      key: 'color-negro',
      color: isDarkMode => isDarkMode ? '#FFFFFF' : '#000000',
      label: isDarkMode => isDarkMode ? getTranslation('profile.color.white', language) : getTranslation('profile.color.black', language)
    },
    {
      key: 'color-azul',
      color: '#1777FF',
      label: getTranslation('profile.color.blue', language)
    },
    {
      key: 'color-rosado',
      color: '#ff85c0',
      label: getTranslation('profile.color.pink', language)
    },
    {
      key: 'color-verde',
      color: '#52c41a',
      label: getTranslation('profile.color.green', language)
    },
    {
      key: 'color-naranja',
      color: '#fa8c16',
      label: getTranslation('profile.color.orange', language)
    },
    {
      key: 'color-rojo',
      color: '#f5222d',
      label: getTranslation('profile.color.red', language)
    }
  ];

  // Use these functions to render color options consistently
  const renderMobileColorOptions = (isDarkMode) => {
    return colorOptions.map(option => (
      <ResponsiveMenuItem
        key={option.key}
        onClick={() => {
          const color = typeof option.color === 'function' ? option.color(isDarkMode) : option.color;
          handleColorChange(color);
        }}
      >
        <ColorDot color={typeof option.color === 'function' ? option.color(isDarkMode) : option.color} />
        {typeof option.label === 'function' ? option.label(isDarkMode) : option.label}
      </ResponsiveMenuItem>
    ));
  };

  const renderDesktopColorOptions = (isDarkMode) => {
    return colorOptions.map(option => (
      <ResponsiveMenuItem
        key={option.key}
        onClick={(e) => {
          e.domEvent.stopPropagation();
          const color = typeof option.color === 'function' ? option.color(isDarkMode) : option.color;
          handleColorChange(color);
        }}
      >
        <ColorDot color={typeof option.color === 'function' ? option.color(isDarkMode) : option.color} />
        {typeof option.label === 'function' ? option.label(isDarkMode) : option.label}
      </ResponsiveMenuItem>
    ));
  };

  // Function to open profile modal
  const showProfileModal = () => {
    setProfileModalVisible(true);
    onVisibleChange(false); // Close the dropdown when opening modal
  };

  // Function to close profile modal
  const closeProfileModal = () => {
    setProfileModalVisible(false);
  };

  // Function to open password change modal
  const showPasswordModal = () => {
    setPasswordModalVisible(true);
    onVisibleChange(false); // Close the dropdown when opening modal
  };

  // Function to close password change modal
  const closePasswordModal = () => {
    setPasswordModalVisible(false);
  };

  // Add these functions for the edit profile modal
  const showEditProfileModal = () => {
    setEditProfileModalVisible(true);
    onVisibleChange(false); // Close the dropdown when opening modal
  };

  const closeEditProfileModal = () => {
    setEditProfileModalVisible(false);
  };

  // Render profile modal
  const renderProfileModal = () => (
    <VerPerfil
      visible={profileModalVisible}
      onClose={closeProfileModal}
      user={currentUser}
      isOwnProfile={true}
    />
  );

  // Render password change modal
  const renderPasswordModal = () => (
    <CambiarMiContraseña
      show={passwordModalVisible}
      onClose={closePasswordModal}
    />
  );

  // Add this function to render the edit profile modal
  const renderEditProfileModal = () => (
    <EditarMiPerfil
      show={editProfileModalVisible}
      onClose={closeEditProfileModal}
    />
  );

  // Conditional rendering based on mobile view and color submenu state
  if (isMobile && showColorSubMenu) {
    return (
      <ResponsiveMenu theme={isDarkMode ? 'dark' : 'light'}>
        <GlobalStyles />
        <SubMenuTitle>
          <BackButton onClick={handleBackToMainMenu}>
            <RightOutlined />
          </BackButton>
          {getTranslation('profile.color.mainColor', language)}
        </SubMenuTitle>
        
        {renderMobileColorOptions(isDarkMode)}
        {/* No custom color picxker for mobile */}
      </ResponsiveMenu>
    );
  }
  
  return (
    <>
      <ResponsiveMenu theme={isDarkMode ? 'dark' : 'light'}>
        <GlobalStyles />
        <UserProfileHeader onClick={showProfileModal}>
          <UserProfileAvatar
            src={currentUser?.ftPerfil}
            icon={!currentUser?.ftPerfil && <UserOutlined />}
            size={48}
          />
          <UserInfoContainer>
            <UserProfileName>
              {currentUser?.nombres} {currentUser?.apellidos}
            </UserProfileName>
            <UserProfileEmail>{currentUser?.correo}</UserProfileEmail>
          </UserInfoContainer>
        </UserProfileHeader>

        <StyledMenuItem 
          key="profile" 
          icon={<UserOutlined />}
          onClick={showProfileModal}
        >
          <MenuItemContent>
            <MenuItemTitle>{getTranslation('profile.header.profile', language)}</MenuItemTitle>
            <MenuItemSubtitle>{getTranslation('profile.header.settings', language)}</MenuItemSubtitle>
          </MenuItemContent>
        </StyledMenuItem>

        <StyledMenuItem
          key="theme"
          icon={!isDarkMode ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
        >
          <MenuItemContent>
            <MenuItemTitle>
              {!isDarkMode 
                ? getTranslation('profile.theme.lightMode', language) 
                : getTranslation('profile.theme.darkMode', language)}
            </MenuItemTitle>
            <MenuItemSubtitle>{getTranslation('profile.theme.changeTheme', language)}</MenuItemSubtitle>
          </MenuItemContent>
        </StyledMenuItem>

        {isMobile ? (
          <StyledMenuItem
            key="color"
            onClick={(e) => {
              e.domEvent.stopPropagation();
              handleColorMenuClick(e);
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ColorDot color={primaryColor} />
              <MenuItemContent>
                <MenuItemTitle>{getTranslation('profile.color.mainColor', language)}</MenuItemTitle>
                <MenuItemSubtitle>{getTranslation('profile.color.customize', language)}</MenuItemSubtitle>
              </MenuItemContent>
            </div>
          </StyledMenuItem>
        ) : (
          <Menu.SubMenu
            key="color"
            popupClassName="color-submenu-responsive"
            onTitleClick={(e) => {
              e.domEvent.stopPropagation();
            }}
            title={
              <MenuItemWrapper>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ColorDot color={primaryColor} />
                  <MenuItemContent>
                    <MenuItemTitle>{getTranslation('profile.color.mainColor', language)}</MenuItemTitle>
                    <MenuItemSubtitle>{getTranslation('profile.color.customize', language)}</MenuItemSubtitle>
                  </MenuItemContent>
                </div>
              </MenuItemWrapper>
            }
          >
            {renderDesktopColorOptions(isDarkMode)}
            <Menu.Divider />
            <Menu.Item 
              key="color-customizado" 
              style={{ cursor: 'default', padding: '16px' }}
            >
              <div 
                onClick={(e) => e.stopPropagation()} 
                style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}
              >
                <ColorDot color={customColor} />
                <span>{getTranslation('profile.color.customColor', language)}</span>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <ResponsiveColorPicker
                  value={customColor}
                  onChange={handleCustomColorChange}
                  showText
                />
              </div>
              <div 
                onClick={(e) => e.stopPropagation()} 
                style={{ textAlign: 'right', marginTop: '10px' }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    applyCustomColor();
                  }}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: customColor,
                    color: getContrastTextColor(customColor),
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {getTranslation('profile.color.apply', language)}
                </button>
              </div>
            </Menu.Item>
          </Menu.SubMenu>
        )}

        <StyledMenuItem 
          key="language" 
          icon={<GlobalOutlined />}
          onClick={changeLanguage}
        >
          <MenuItemContent>
            <MenuItemTitle>
              {language !== 'es' ? 'English' : 'Español'}
            </MenuItemTitle>
            <MenuItemSubtitle>
              {language !== 'es' ? 'Change language' : 'Cambiar idioma'}
            </MenuItemSubtitle>
          </MenuItemContent>
        </StyledMenuItem>

        <MenuDividerWrapper>
          <Divider style={{ margin: '8px 0' }} />
        </MenuDividerWrapper>

        <StyledMenuItem 
          key="editProfile" 
          icon={<EditOutlined />}
          onClick={showEditProfileModal}
        >
          <MenuItemContent>
            <MenuItemTitle>{getTranslation('profile.editProfile.title', language)}</MenuItemTitle>
            <MenuItemSubtitle>{getTranslation('profile.editProfile.subtitle', language)}</MenuItemSubtitle>
          </MenuItemContent>
        </StyledMenuItem>

        <StyledMenuItem 
          key="changePassword" 
          icon={<LockOutlined />}
          onClick={showPasswordModal}
        >
          <MenuItemContent>
            <MenuItemTitle>{getTranslation('profile.changePassword.title', language)}</MenuItemTitle>
            <MenuItemSubtitle>{getTranslation('profile.changePassword.subtitle', language)}</MenuItemSubtitle>
          </MenuItemContent>
        </StyledMenuItem>

        <MenuDividerWrapper>
          <Divider style={{ margin: '8px 0' }} />
        </MenuDividerWrapper>

        <StyledMenuItem
          key="logout"
          icon={<LogoutOutlined style={{ color: '#ff4d4f' }} />}
          onClick={logout}
          style={{ color: '#ff4d4f' }}
        >
          <MenuItemContent>
            <MenuItemTitle>{getTranslation('profile.logout.title', language)}</MenuItemTitle>
            <MenuItemSubtitle style={{ color: 'rgba(255, 77, 79, 0.65)' }}>
              {getTranslation('profile.logout.subtitle', language)}
            </MenuItemSubtitle>
          </MenuItemContent>
        </StyledMenuItem>
      </ResponsiveMenu>
      
      {/* Render both modals */}
      {renderProfileModal()}
      {renderPasswordModal()}
      {renderEditProfileModal()}
    </>
  );
};

export default ProfileDropdown;