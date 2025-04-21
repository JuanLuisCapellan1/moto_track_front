import React from 'react';
import { Card, Typography, Divider } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StatusTag from '../../CommonComponts/StatusTag';
import MainButton from '../../CommonComponts/MainButton';
import SecondaryButton from '../../CommonComponts/SecondaryButton';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  overflow: hidden;
  
  .ant-card-body {
    padding: 16px;
    
    @media (max-width: 576px) {
      padding: 12px;
    }
  }
`;

const InfoLabel = styled(Text)`
  color: #8c8c8c;
  font-size: 12px;
  display: block;
`;

const InfoValue = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  display: block;
  word-break: break-word;
`;

const MotorcycleTitle = styled(Title)`
  margin-bottom: 4px !important;
  
  @media (max-width: 576px) {
    font-size: 18px !important;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    
    button {
      width: 100%;
      margin-bottom: 8px;
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const InfoColumn = styled.div`
  margin-bottom: 8px;
`;

function SolicitudesCards({ 
  data = {},
  actions = [],
  titleField = 'modelo',
  statusField = 'estado',
  infoFields = [
    { key: 'placa', label: 'Placa' },
    { key: 'chasis', label: 'Chasis' },
    { key: 'fechaRegistro', label: 'Fecha de Registro' },
    { key: 'tipoUso', label: 'Tipo de uso' }
  ],
  cardProps = {}
}) {
  // Mapeo de valores de la API a los códigos internos
  const mapApiStatusToInternal = (apiStatus) => {
    switch (apiStatus) {
      case 'Aprobada':
        return 'MOTO_APROBADA';
      case 'Pendiente':
        return 'MOTO_PENDIENTE';
      case 'Rechazada':
        return 'MOTO_RECHAZADA';
      default:
        return 'UNKNOWN'; // Valor por defecto si no coincide
    }
  };
  return (
    <StyledCard {...cardProps}>
      <TitleContainer>
        <MotorcycleTitle level={5}>
          {(data.vehiculo.marca.nombre + ' ' + data.vehiculo.modelo.nombre + ' ' + data.vehiculo.año) || 'No disponible'}
        </MotorcycleTitle>
        {data.solicitud.estadoDecision && <StatusTag status={mapApiStatusToInternal(data.solicitud.estadoDecision)} />}
      </TitleContainer>
      
      <Divider style={{ margin: '8px 0 16px' }} />
      
      <InfoContainer>
        {infoFields.map((field, index) => (
          <InfoColumn key={field.key}>
            <InfoLabel>{field.label}</InfoLabel>
            <InfoValue>
              {field.getValue ? field.getValue(data) : 'No disponible'}
            </InfoValue>
          </InfoColumn>
        ))}
      </InfoContainer>
      
      <ButtonsContainer>
        {actions.map((action, index) => 
          action.showAsComponent ? (
            // If it's a component, render it directly
            <React.Fragment key={index}>{action.component}</React.Fragment>
          ) : (
            // Choose between MainButton and SecondaryButton based on primary prop
            action.primary ? (
              <MainButton
                key={index}
                onClick={action.onClick}
                icon={action.icon}
                disabled={action.disabled}
                {...(action.buttonProps || {})}
              >
                {action.label}
              </MainButton>
            ) : (
              <SecondaryButton
                key={index}
                onClick={action.onClick}
                icon={action.icon}
                disabled={action.disabled}
                {...(action.buttonProps || {})}
              >
                {action.label}
              </SecondaryButton>
            )
          )
        )}
      </ButtonsContainer>
    </StyledCard>
  );
}

SolicitudesCards.propTypes = {
  data: PropTypes.object,
  actions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        component: PropTypes.node,
        showAsComponent: PropTypes.bool
      }),
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        icon: PropTypes.node,
        primary: PropTypes.bool,
        disabled: PropTypes.bool,
        buttonProps: PropTypes.object
      })
    ])
  ),
  titleField: PropTypes.string,
  statusField: PropTypes.string,
  infoFields: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  cardProps: PropTypes.object
};

export default SolicitudesCards;