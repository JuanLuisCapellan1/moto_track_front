import React, { useContext } from 'react';
import { Tag, theme } from 'antd';
import styled from 'styled-components';
import { useLanguage } from '../../../context/LanguageContext';

// Create translations for status text
const STATUS_TRANSLATIONS = {
  en: {
    MOTO_APROBADA: 'Approved',
    MOTO_PENDIENTE: 'Pending',
    MOTO_RECHAZADA: 'Rejected',
    USUARIO_ACTIVO: 'Active',
    USUARIO_INACTIVO: 'Inactive',
    USUARIO_DESHABILITADO: 'Disabled',
    UNKNOWN: 'Unknown'
  },
  es: {
    MOTO_APROBADA: 'Aprobada',
    MOTO_PENDIENTE: 'Pendiente',
    MOTO_RECHAZADA: 'Rechazada',
    USUARIO_ACTIVO: 'Activo',
    USUARIO_INACTIVO: 'Inactivo',
    USUARIO_DESHABILITADO: 'Deshabilitado',
    UNKNOWN: 'Desconocido'
  }
};

// Configuración de colores y propiedades para cada estado con consistencia de brillo
const STATUS_CONFIG = {
  // Estados para motocicletas
  MOTO_APROBADA: {
    color: '#1AAA4C', // Verde más brillante para ambos modos
    colorDark: '#1AAA4C'
  },
  MOTO_PENDIENTE: {
    color: '#F28C28', // Naranja más brillante para ambos modos
    colorDark: '#F28C28'
  },
  MOTO_RECHAZADA: {
    color: '#E53935', // Rojo más brillante para ambos modos
    colorDark: '#E53935'
  },
  
  // Estados para usuarios
  USUARIO_ACTIVO: {
    color: '#1AAA4C', // Verde más brillante para ambos modos
    colorDark: '#1AAA4C'
  },
  USUARIO_INACTIVO: {
    color: '#FA8C16', // Rojo más brillante para ambos modos
    colorDark: '#E53935'
  },
  USUARIO_DESHABILITADO: {
    color: '#E53935', // Rojo más brillante para ambos modos
    colorDark: '#E53935'
  }
};

const StyledTag = styled(Tag)`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  font-weight: 600;
  border-radius: 16px;
  color: ${props => props.textcolor || '#000000'};
  background-color: ${props => props.bgcolor || '#f0f0f0'};
  border: none;
  
  &.bubble {
    border-radius: 16px;
  }
  
  &.dark-mode {
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.1);
  }
  
  &.light-mode {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.05);
  }
`;

/**
 * Componente para mostrar etiquetas de estado con título del color del estado
 * y fondo con opacidad, con brillo consistente en modo oscuro y claro
 * 
 * @param {string} status - Código de estado (MOTO_APROBADA, USUARIO_ACTIVO, etc.)
 * @param {string} customText - Texto personalizado (opcional, reemplazará el texto por defecto)
 * @param {boolean} bubble - Si es true, la etiqueta tendrá estilo burbuja redondeada
 * @param {object} style - Estilos adicionales
 */
const StatusTag = ({ 
  status, 
  customText, 
  bubble = true, 
  style = {},
  ...restProps 
}) => {
  const { token } = theme.useToken();
  const { language } = useLanguage();
  const isDarkMode = token.colorBgContainer !== '#ffffff'; // Detección de modo oscuro
  
  // Get translations for current language
  const translations = STATUS_TRANSLATIONS[language] || STATUS_TRANSLATIONS.es;
  
  const config = STATUS_CONFIG[status] || {
    color: '#A6A6A6',
    colorDark: '#A6A6A6'
  };
  
  // Get translated text for this status
  const statusText = translations[status] || translations.UNKNOWN;
  
  // Usar el mismo color brillante en ambos modos
  const textColor = config.color;
  
  // Crear un color con opacidad para el fondo usando el color del estado
  const getBackgroundWithOpacity = (hexColor) => {
    // Convertir a RGB y agregar opacidad
    if (hexColor.startsWith('#')) {
      // Convertir hex a rgba
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      // Usar la misma opacidad en ambos modos
      const opacity = 0.18;
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    // Fallback para otros formatos de color
    return `${hexColor}30`;
  };
  
  const tagClassName = `${bubble ? 'bubble' : ''} ${isDarkMode ? 'dark-mode' : 'light-mode'}`.trim();
  
  return (
    <StyledTag
      className={tagClassName}
      style={style}
      textcolor={textColor}
      bgcolor={getBackgroundWithOpacity(textColor)}
      {...restProps}
    >
      {customText || statusText}
    </StyledTag>
  );
};

// Constantes exportadas para facilitar el uso
export const MOTO_STATUS = {
  APROBADA: 'MOTO_APROBADA',
  PENDIENTE: 'MOTO_PENDIENTE',
  RECHAZADA: 'MOTO_RECHAZADA'
};

export const USUARIO_STATUS = {
  ACTIVO: 'USUARIO_ACTIVO',
  DESHABILITADO: 'USUARIO_DESHABILITADO',
  INACTIVO: 'USUARIO_INACTIVO'
};

export default StatusTag;