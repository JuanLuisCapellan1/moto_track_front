import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../../../../context/LanguageContext';
import DatosPersonalesConfirmation from './Confirmation/DatosPersonalesConfirmation';
import DatosMotocicletasConfirmation from './Confirmation/DatosMotocicletasConfirmation';
import DocumentosConfirmation from './Confirmation/DocumentosConfirmation';
import TabsRegistro from './Confirmation/TabsRegistro';
import moment from 'moment';

const ConfirmationContainer = styled.div`
  margin-top: 20px;
`;

const Confirmation = ({ form, formData, onSubmit }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = React.useState('1');
  
  
  // Obtener todos los valores del formulario, incluyendo los documentos
  const allFormValues = form.getFieldsValue(true); // El true asegura que se obtengan todos los valores
  
  // Map form data to the expected structure for each component
  const personalData = {
    nombreCompleto: formData?.fullName || allFormValues?.firstName + ' ' + allFormValues?.lastName,
    fechaNacimiento: formData?.birthDate ? moment(formData.birthDate).format('YYYY-MM-DD') : '',
    sexo: formData?.gender === 'male' ? 'Masculino' : 'Femenino',
    cedula: formData?.idDocument,
    telefono: formData?.phone,
    estadoCivil: formData?.maritalStatus,
    direccion: formData?.address,
    correo: formData?.email,
  };
  //console.log("Confirmation está pasando formData:", allFormValues);
  const motorcycleData = {
    vehiculo: {
      año: formData?.year,
      color: formData?.color,
      cilindraje: formData?.engineSize ? `${formData.engineSize}` : '',
      marca: {
        id: allFormValues?.brand.id,
        nombre: allFormValues?.brand.nombre
      },
      modelo: {
        id: allFormValues?.model.id,
        nombre: allFormValues?.model.nombre,
      },
      tipoUso: formData?.useType,
      chasis: formData?.chassisNumber,
    },
    ...(formData?.hasInsurance === 'yes' ? {
      seguro: {
        proveedor: formData?.insuranceProvider,
        numeroPoliza: formData?.policyNumber
      }
    } : null)
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <ConfirmationContainer>
      <TabsRegistro
        activeKey={activeTab}
        onChange={handleTabChange}
        datosPersonalesContent={<DatosPersonalesConfirmation userData={personalData} />}
        datosMotocicletaContent={<DatosMotocicletasConfirmation motoData={motorcycleData} />}
        documentosContent={<DocumentosConfirmation formData={allFormValues} />}
      />
    </ConfirmationContainer>
  );
};

export default Confirmation;