import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LogoImg from '../../../assets/Lading/MotoTrackLogo.png';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

const NavContainer = styled.nav`
  padding: 0.8rem 2rem;
  background: white;
  border-radius: 0 0 50px 50px;
  margin: 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  max-width: calc(100% - 2rem);
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }

  @media (max-width: 1200px) {
    padding: 0.8rem 1rem;
    margin: 0 0.5rem;
    max-width: calc(100% - 1rem);
  }
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled.div`
  img {
    height: 110px;
    padding-bottom: 15px;
    
    @media (max-width: 1200px) {
      height: 80px; // Reducido de 95px a 80px
      padding-bottom: 10px;
    }
  }
  padding: 0;
  
  @media (max-width: 1200px) {
    flex-shrink: 1;
    margin-right: 0.5rem;
  }
`;

const MenuContainer = styled.div`
  background: #f4f4f5;
  border-radius: 50px;
  padding: 0.4rem;
  margin: 0 2rem;
  flex: 1;
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  justify-content: center;

  @media (max-width: 1200px) {
    margin: 0 0.3rem;
    flex: 0 1 auto;
    min-width: 0; // Importante para permitir shrink
    max-width: calc(100% - 300px); // Asegura espacio para los botones
  }
`;

const StyledMenu = styled(Menu)`
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;

  .ant-menu-item {
    color: #1a1a1a;
    font-size: 1rem;
    padding: 0.5rem 1.2rem;
    margin: 0 8px !important;
    border-radius: 50px;
    height: auto;
    line-height: 1.5;
    z-index: 1;
    transition: all 0.15s ease-out !important; /* Transición más rápida */

    @media (max-width: 1200px) {
      padding: 0.4rem 0.4rem;
      margin: 0 1px !important;
      font-size: 0.75rem; // Reducido
      min-width: auto;
    }

    @media (max-width: 1000px) {
      padding: 0.5rem 0.4rem;
      margin: 0 1px !important;
      font-size: 0.8rem;
    }

    &:hover {
      color: rgba(99, 101, 241, 0.49) !important;
    }

    &.ant-menu-item-selected {
      background: white !important;
      color: #6366f1 !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      border-radius: 50px;
      transition: all 0.1s ease-in !important; /* Transición aún más rápida para selected */
    }

    &.ant-menu-item-active {
      background: transparent !important;
    }

    &::after {
      display: none !important;
    }
  }
  
  // Eliminar cualquier residuo de selección
  .ant-menu-light-item-selected::after, 
  .ant-menu-light:not(.ant-menu-horizontal) .ant-menu-item-selected::after {
    opacity: 0 !important;
    display: none !important;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    gap: 0.2rem;
    min-width: auto;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginButton = styled(motion.button)`
  padding: 0.5rem 1.2rem;
  background: transparent;
  border: 1px solid transparent;
  color: #1a1a1a;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 50px;
  position: relative;
  overflow: hidden;
  min-width: 120px;
  height: 38px;

  @media (max-width: 1200px) {
    min-width: 80px; // Reducido de 90px a 80px
    padding: 0.4rem 0.4rem;
    font-size: 0.75rem;
    height: 34px;
  }
`;

const RegisterButton = styled(motion.button)`
  padding: 0.5rem 1.2rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);
  min-width: 120px;
  height: 38px;

  @media (max-width: 1200px) {
    min-width: 80px; // Reducido de 90px a 80px
    padding: 0.4rem 0.4rem;
    font-size: 0.75rem;
    height: 34px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #1a1a1a;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: ${props => props.$isOpen ? 'block' : 'none'};
`;

const MobileMenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 300px;
  height: 100%;
  background: white;
  z-index: 999;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileMenuItem = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

  &.selected {
    color: #6366f1;
    font-weight: bold;
  }
`;

const MobileButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function Nav() {
  const [selectedKey, setSelectedKey] = useState('characteristics');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Nuevo efecto para detectar secciones visibles durante el scroll
  useEffect(() => {
    // Opciones para el Intersection Observer
    const options = {
      root: null,
      rootMargin: '-80px 0px -60% 0px', // Ajustado para detectar antes
      threshold: 0.05 // Reducido para activar más rápido
    };

    // Callback que se ejecuta cuando una sección entra o sale del viewport
    const handleIntersect = (entries) => {
      // Encuentra la entrada con mayor ratio de intersección
      let bestEntry = null;
      let maxRatio = 0;
      
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          bestEntry = entry;
        }
      });
      
      // Si encontramos una entrada visible, actualiza el selectedKey
      if (bestEntry) {
        setSelectedKey(bestEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    
    // Observar todas las secciones
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      observer.observe(section);
    });

    // Limpieza al desmontar
    return () => {
      if (observer) {
        sections.forEach(section => {
          observer.unobserve(section);
        });
      }
    };
  }, []);

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    setIsMobileMenuOpen(false);

    // Desplázate a la sección correspondiente
    const section = document.getElementById(key);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuItems = [
    { key: 'characteristics', label: 'Características' },
    { key: 'how-it-works', label: 'Cómo Funciona' },
    { key: 'users', label: 'Usuarios' },
    { key: 'testimonials', label: 'Testimonios' },
    { key: 'collaboration', label: 'Colaboración' },
    { key: 'faq', label: 'FAQ' },
    { key: 'support', label: 'Soporte' },
  ];

  return (
    <NavContainer>
      <NavWrapper>
        <Logo>
          <Link to="/">
            <img src={LogoImg} alt="Logo" />
          </Link>
        </Logo>

        <MenuContainer $isVisible={windowWidth > 768}>
          <StyledMenu
            mode="horizontal"
            selectedKeys={[selectedKey]}
            onSelect={handleMenuClick}
            items={menuItems}
          />
        </MenuContainer>

        <ButtonContainer>
          <Link to="/login">
            <LoginButton
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 0px 8px rgba(99, 102, 241, 0.3)",
                border: "1px solid rgba(99, 102, 241, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Iniciar Sesión
            </LoginButton>
          </Link>
          <Link to="/register">
            <RegisterButton
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0px 0px 15px rgba(99, 102, 241, 0.5)",
                background: "#5254ce"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              initial={{ y: 0 }}
              animate={{
                y: [0, -2, 0],
                transition: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.5,
                  ease: "easeInOut"
                }
              }}
            >
              Registrarse
            </RegisterButton>
          </Link>
        </ButtonContainer>

        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <MenuOutlined />
        </MobileMenuButton>

        <MobileMenuOverlay
          $isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <MobileMenuContainer style={{ display: isMobileMenuOpen ? 'block' : 'none' }}>
          <MobileMenuHeader>
            <h2>Menú</h2>
            <CloseOutlined onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '1.5rem', cursor: 'pointer' }} />
          </MobileMenuHeader>

          {menuItems.map(item => (
            <MobileMenuItem
              key={item.key}
              className={selectedKey === item.key ? 'selected' : ''}
              onClick={() => handleMenuClick({ key: item.key })}
            >
              {item.label}
            </MobileMenuItem>
          ))}

          <MobileButtonContainer>
            <Link to="/login" style={{ width: '100%' }}>
              <LoginButton 
                style={{ width: '100%' }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0px 0px 8px rgba(99, 102, 241, 0.3)",
                  border: "1px solid rgba(99, 102, 241, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Iniciar Sesión
              </LoginButton>
            </Link>
            <Link to="/register" style={{ width: '100%' }}>
              <RegisterButton 
                style={{ width: '100%' }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0px 0px 15px rgba(99, 102, 241, 0.5)",
                  background: "#5254ce"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Registrarse
              </RegisterButton>
            </Link>
          </MobileButtonContainer>
        </MobileMenuContainer>
      </NavWrapper>
    </NavContainer>
  );
}

export default Nav;