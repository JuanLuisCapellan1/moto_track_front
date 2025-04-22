import React, { useState, useEffect } from 'react';
import { Form, DatePicker, Select } from 'antd';
import esES from 'antd/es/date-picker/locale/es_ES';
import enUS from 'antd/es/date-picker/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import styled, { createGlobalStyle } from 'styled-components';
import { CalendarOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
// Fix the path from contexts to context
import { useLanguage } from '../../../../context/LanguageContext';
import Modal from '../../CommonComponts/Modals';
import Inputs from '../../CommonComponts/Inputs';
import MainButton from '../../CommonComponts/MainButton';
import SecondaryButton from '../../CommonComponts/SecondaryButton';
// 1. Importar el hook useNotification
import { useNotification } from '../../CommonComponts/ToastNotifications';
import { useAuth } from '../../../../context/AuthContext';

// Al inicio del archivo, agrega estos imports adicionales para plugins de dayjs
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/es';
import axios from 'axios';

// Extiende dayjs con los plugins necesarios
dayjs.extend(customParseFormat);
dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);

const FormContainer = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Add roles data
const typeUser = [
  { value: 1, label: 'Administrador' },
  { value: 2, label: 'Empleado' },
];

const StyledForm = styled(Form)`
  .ant-form-item-required::before {
    display: none !important;
  }

  .ant-form-item-explain-error {
    color: #ff4d4f;
    font-size: 14px;
    margin-top: 4px;
  }

  .ant-form-item-has-error .ant-input,
  .ant-form-item-has-error .ant-picker,
  .ant-form-item-has-error .ant-select-selector {
    border-color: #ff4d4f !important;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  &.ant-picker {
    width: 100%;
    height: 44px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme?.token?.borderColorBase || '#d9d9d9'};
    
    &:hover {
      border-color: ${props => props.theme?.token?.colorPrimary || '#1890ff'};
    }
    
    .ant-picker-input {
      input {
        height: 42px;
        font-size: 14px;
      }
    }
  }
`;

// Añadir estos estilos para los mensajes de error
const ErrorMessage = styled.div`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 4px;
`;

const GlobalStyle = createGlobalStyle`
  .styled-form .ant-form-item-required::before {
    display: none !important;
  }

  .styled-form .ant-form-item-explain-error {
    color: #ff4d4f !important;
    font-size: 14px;
    margin-top: 4px;
  }

  .styled-form .ant-form-item-has-error .ant-input,
  .styled-form .ant-form-item-has-error .ant-picker,
  .styled-form .ant-form-item-has-error .ant-select-selector {
    border-color: #ff4d4f !important;
  }
`;

const CrearEditarEmpleado = ({ visible, onClose, empleadoData, isEditing }) => {
  // Agregar el hook useNotification
  const notification = useNotification();
  
  // Asegúrate de que Form.useForm() se llame al principio del componente
  const [form] = Form.useForm();
  const [selectedProvincia, setSelectedProvincia] = useState(null);
  const [municipios, setMunicipios] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [showNewPassword, setShowNewPassword] = useState(false); // Estado para mostrar/ocultar nueva contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar confirmar contraseña
  const [isSubmitting, setIsSubmitting] = useState(false);
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();
  // Add fallback for language context in case it's not available
  const languageContext = useLanguage ? useLanguage() : { language: 'es' };
  const { language = 'es' } = languageContext;

  // Translations object
  const t = {
    es: {
      createUser: 'Crear Usuario',
      editUser: 'Editar Usuario',
      names: 'Nombres',
      enterNames: 'Ingrese sus Nombres',
      lastName: 'Apellidos',
      enterLastName: 'Ingrese sus Apellidos',
      idNumber: 'Cédula de Identidad / Pasaporte',
      phone: 'Teléfono',
      birthDate: 'Fecha de Nacimiento',
      status: 'Estado',
      province: 'Provincia',
      selectProvince: 'Seleccione su Provincia',
      municipality: 'Municipio',
      selectMunicipality: 'Seleccione su Municipio',
      address: 'Dirección',
      enterAddress: 'Ingrese su Dirección',
      cancel: 'Cancelar',
      save: 'Guardar Cambios',
      create: 'Crear Usuario',
      active: 'Activo',
      inactive: 'Inactivo',
      disabled: 'Deshabilitado',
      enterBirthDate: 'Seleccione su fecha de nacimiento',
      email: 'Correo Electrónico',
      enterEmail: 'Ingrese su correo electrónico',
      invalidEmail: 'Por favor ingrese un correo electrónico válido',
      invalidPhone: 'Por favor ingrese un número de teléfono válido',
      invalidCedula: 'Por favor ingrese una cédula válida (000-0000000-0)',
      enterIdNumber: 'Ingrese su cédula',
      enterPhone: 'Ingrese su teléfono',
      selectProvince: 'Seleccione su provincia',
      selectMunicipality: 'Seleccione su municipio',
      updateError: 'Error de Actualización',
      updateErrorDesc: 'Error al actualizar el usuario. Por favor intente nuevamente.',
      userUpdated: 'Usuario Actualizado',
      userUpdatedDesc: 'El usuario ha sido actualizado correctamente',
      userCreated: 'Usuario Creado',
      userCreatedDesc: 'El usuario ha sido creado correctamente',
      validationError: 'Error de Validación',
      validationErrorDesc: 'Por favor complete todos los campos requeridos correctamente.',
      cargo: 'Cargo',
      typeUser: 'Tipo de Usuario',
      typeUserPlaceholder: 'Seleccione un tipo de usuario',
      selectRole: 'Seleccione un Cargo',
      admin: 'Administrador',
      employee: 'Empleado',
      newPassword: 'Nueva Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      enterNewPassword: 'Por favor ingrese una nueva contraseña',
      passwordTooShort: 'La contraseña debe tener al menos 8 caracteres',
      passwordInvalid: 'La contraseña debe incluir al menos una mayúscula, una minúscula y un número',
      confirmPasswordError: 'Las contraseñas no coinciden',
      gender: 'Género',
      selectGender: 'Seleccione su género',
      maritalStatus: 'Estado Civil',
      selectMaritalStatus: 'Seleccione su estado civil',
    },
    en: {
      createUser: 'Create User',
      editUser: 'Edit User',
      names: 'Names',
      enterNames: 'Enter your Names',
      lastName: 'Last Name',
      enterLastName: 'Enter your Last Name',
      idNumber: 'ID Number / Passport',
      phone: 'Phone',
      birthDate: 'Birth Date',
      status: 'Status',
      province: 'Province',
      selectProvince: 'Select your Province',
      municipality: 'Municipality',
      selectMunicipality: 'Select your Municipality',
      address: 'Address',
      enterAddress: 'Enter your Address',
      cancel: 'Cancel',
      save: 'Save Changes',
      create: 'Create User',
      active: 'Active',
      inactive: 'Inactive',
      disabled: 'Disabled',
      enterBirthDate: 'Select your birth date',
      email: 'Email',
      enterEmail: 'Enter your email address',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number',
      invalidCedula: 'Please enter a valid ID number (000-0000000-0)',
      enterIdNumber: 'Enter your ID number',
      enterPhone: 'Enter your phone number',
      selectProvince: 'Select your province',
      selectMunicipality: 'Select your municipality',
      updateError: 'Update Error',
      updateErrorDesc: 'Error updating user. Please try again.',
      userUpdated: 'User Updated',
      userUpdatedDesc: 'User has been successfully updated',
      userCreated: 'User Created',
      userCreatedDesc: 'User has been successfully created',
      validationError: 'Validation Error',
      validationErrorDesc: 'Please complete all required fields correctly.',
      cargo: 'Position',
      typeUser: 'User Type',
      typeUserPlaceholder: 'Select a user type',
      selectRole: 'Select a Position',
      admin: 'Administrator',
      employee: 'Employee',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      enterNewPassword: 'Please enter a new password',
      passwordTooShort: 'Password must be at least 8 characters long',
      passwordInvalid: 'Password must include at least one uppercase letter, one lowercase letter, and one number',
      confirmPasswordError: 'Passwords do not match',
      gender: 'Gender',
      selectGender: 'Select your gender',
      maritalStatus: 'Marital Status',
      selectMaritalStatus: 'Select your marital status',
    },
  };

  // Get current language translations
  const texts = t[language] || t.es;

  const fetchProvincias = async () => {
    try {
      const response = await axios.get(`${api_url}/api/provincia`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (response.data.success) {
        setProvincias(response.data.data);
        return;
      }
      notification.error(
        texts.updateError,
        texts.updateErrorDesc
      );
    } catch (error) {
      console.error('Error fetching provincias:', error);
      notification.error(
        texts.updateError,
        texts.updateErrorDesc
      );
    }
  }

  const fetchCargos = async () => {
    try {
      const response = await axios.get(`${api_url}/api/tipoPersona`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (response.data.success) {
        setCargos(response.data.data);
        return;
      }
      notification.error(
        texts.updateError,
        texts.updateErrorDesc
      );
    } catch (error) {
      console.error('Error fetching provincias:', error);
      notification.error(
        texts.updateError,
        texts.updateErrorDesc
      );
    }
  }

  const fetchMunicipios = async (provinciaId) => {
    try {
      const response = await axios.get(`${api_url}/api/municipio?idProvincia=${provinciaId}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (response.data.success) {
        setMunicipios(response.data.data);
        return;
      }
      notification.error(
        texts.updateError,
        texts.updateErrorDesc
      );
    } catch (error) {
      console.error('Error fetching Municipios:', error);
      notification.error(
        texts.updateError,
        texts.updateErrorDesc
      );
    }
  }

  // Consolidar los tres useEffects en uno solo
  useEffect(() => {
    // Establecer el idioma para dayjs
    dayjs.locale(language === 'es' ? 'es' : 'en');

    // Manejo del formulario solo cuando es visible
    if (visible) {
      // Resetear formulario
      form.resetFields();
      fetchProvincias();
      fetchCargos();
      // Reset selectedProvincia and municipios by default
      setSelectedProvincia(null);
      setMunicipios([]);

      // Establecer valores iniciales de manera segura
      if (isEditing && empleadoData) {
        let initialValues = { ...empleadoData, estado: empleadoData.estado };
        
        // Formatear la fecha de nacimiento si existe
        if (empleadoData.fechaNacimiento) {
          try {
            const parsedDate = dayjs(empleadoData.fechaNacimiento);
            if (parsedDate.isValid()) {
              initialValues.fechaNacimiento = parsedDate;
            } else {
              initialValues.fechaNacimiento = null;
              console.warn('Invalid date, setting to null');
            }
          } catch (error) {
            console.error('Error parsing date:', error);
            initialValues.fechaNacimiento = null;
          }
        }
        
        form.setFieldsValue(initialValues);
      } else {
        form.setFieldsValue({ 
          estado: 'ACTIVO',
          rol: 'EMPLEADO', // Set default role to employee
          fechaNacimiento: null
        });
      }
    }
  }, [visible, form, empleadoData, isEditing, language]);

  useEffect(() => {
    // Si hay un valor inicial para la provincia, ejecutar fetchMunicipios
    const provinciaId = empleadoData?.datosPersonales?.ubicacion?.provincia?.id;
    const municipioId = empleadoData?.datosPersonales?.ubicacion?.municipio?.id;
  
    if (provinciaId) {
      fetchMunicipios(provinciaId).then(() => {
        // Establecer el valor inicial del municipio en el formulario
        if (municipioId) {
          form.setFieldsValue({ municipio: municipioId });
        }
      });
    }
  }, [empleadoData, form]);

  const handleProvinciaChange = async (value) => {
    setSelectedProvincia(value);
    await fetchMunicipios(value); // Fetch municipios based on selected provincia
    form.setFieldsValue({ municipio: undefined }); // Clear municipio when provincia changes
  };

  const handleMunicipioChange = async (value) => {
    try {
      if(isEditing){
        // Realizar el PUT request a /ubicacion
        console.log(empleadoData, value);
        const response = await axios.put(`${api_url}/api/ubicacion`, {
          idUbicacion: empleadoData?.datosPersonales?.ubicacion?.id || null, // ID de la ubicación si existe
          direccion: form.getFieldValue('direccion'), // Obtener la dirección del formulario
          idMunicipio: value, // ID del municipio seleccionado
        }, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });

        if (response.data.success) {
          notification.success(
            texts.userUpdated,
            'La ubicación ha sido actualizada correctamente.'
          );
        } else {
          notification.error(
            texts.updateError,
            'No se pudo actualizar la ubicación. Intente nuevamente.'
          );
        }
      } else {
        return;
      }
    } catch (error) {
      console.error('Error updating location:', error);
      notification.error(
        texts.updateError,
        'Ocurrió un error al actualizar la ubicación.'
      );
    }
  };

  // Add a clean-up function when the modal is closed
  const handleClose = () => {
    // Reset state when closing
    setSelectedProvincia(null);
    setMunicipios([]);
    onClose();
  };

  const formatCedula = (cedula) => {
    if (!cedula) return undefined;
    // Remove any non-digit characters
    const cleaned = cedula.replace(/\D/g, '');
    // Check if we have the correct length
    if (cleaned.length !== 11) return cedula;
    // Format with dashes
    return `${cleaned.substring(0, 3)}-${cleaned.substring(3, 10)}-${cleaned.substring(10)}`;
  };

  // Helper function to format phone number
  const formatPhone = (phone) => {
    if (!phone) return undefined;
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    // Check if we have the correct length
    if (cleaned.length !== 10) return phone;
    // Format with dashes
    return `${cleaned.substring(0, 3)}-${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
  };


  // Actualizar la función handleSubmit para mostrar notificaciones
  const handleSubmit = async (values) => {
    // Eliminar guiones y validar que sean solo números
    const formattedData = {
      ...values,
      cedula: values.cedula.replace(/\D/g, ''), // Elimina caracteres no numéricos de la cédula
      telefono: values.telefono.replace(/\D/g, ''), // Elimina caracteres no numéricos del teléfono
      fechaNacimiento: values.fechaNacimiento && dayjs(values.fechaNacimiento).isValid()
        ? dayjs(values.fechaNacimiento).format('YYYY-MM-DD')
        : null,
    };

    // Validar que la cédula y el teléfono contengan solo números
    if (!/^\d+$/.test(formattedData.cedula)) {
      notification.error(
        texts.validationError,
        'La cédula debe contener solo números.'
      );
      return;
    }

    if (!/^\d+$/.test(formattedData.telefono)) {
      notification.error(
        texts.validationError,
        'El teléfono debe contener solo números.'
      );
      return;
    }

    if (isEditing) {
      // Determinar los campos cambiados para usuario y persona
      const changedFields = {};
      ['nombres', 'apellidos', 'correo', 'estado', 'idTipoUsuario'].forEach((field) => {
        if (empleadoData[field] !== formattedData[field]) {
          changedFields[field] = formattedData[field];
        }
      });

      const changedPersonaFields = {};
      ['cedula', 'sexo', 'estadoCivil', 'telefono', 'fechaNacimiento', 'municipio', 'provincia', 'direccion', 'idTipoPersona'].forEach((field) => {
        let originalValue = empleadoData?.datosPersonales?.[field];
        let newValue = formattedData[field];

        // Normalizar valores para comparación
        if (field === 'cedula' || field === 'telefono') {
          // Eliminar guiones o espacios para comparar
          originalValue = originalValue?.replace(/\D/g, '');
          newValue = newValue?.replace(/\D/g, '');
        } else if (field === 'fechaNacimiento') {
          // Asegurarse de que ambas fechas estén en el mismo formato
          originalValue = originalValue ? dayjs(originalValue).format('YYYY-MM-DD') : null;
          newValue = newValue ? dayjs(newValue).format('YYYY-MM-DD') : null;
        } else if (field === 'estadoCivil' || field === 'sexo') {
          // Convertir a minúsculas para comparación
          originalValue = originalValue?.toLowerCase();
          newValue = newValue?.toLowerCase();
        }

        // Comparar valores normalizados
        if (originalValue !== newValue) {
          changedPersonaFields[field] = newValue;
        }
      });

      // Si no hay cambios, no hacer nada
      if (Object.keys(changedFields).length === 0 && Object.keys(changedPersonaFields).length === 0) {
        notification.info(
          texts.validationError,
          texts.validationErrorDesc
        );
        return;
      }

      try {
        setIsSubmitting(true);
        const requestBody = {
          id: empleadoData?.id || null,
          ...changedFields, // Solo los campos que cambiaron
          datosPersonales: Object.keys(changedPersonaFields).length > 0 ? changedPersonaFields : undefined, // Solo si hay cambios en datosPersonales
        };

        JSON.stringify(requestBody); // Esto lanzará un error si hay referencias circulares
      

        await axios.put(`${api_url}/api/user`, requestBody, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
  
        // Mostrar notificación de éxito si ambas solicitudes tienen éxito
        notification.success(
          texts.userUpdated,
          texts.userUpdatedDesc
        );
        handleClose();
      } catch (error) {
        // Mostrar notificación de error si alguna solicitud falla
        console.error('Error updating user or persona:', error);
        notification.error(
          texts.updateError,
          texts.updateErrorDesc
        );
        setIsSubmitting(false);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      try {
        setIsSubmitting(true);
        const response = await axios.post(`${api_url}/api/user`, {
          nombres: formattedData.nombres,
          apellidos: formattedData.apellidos,
          correo: formattedData.correo,
          contrasena: formattedData.newPassword,
          idTipoUsuario: formattedData.idTipoUsuario,
          cedula: formattedData.cedula,
          estado: formattedData.estado.toLowerCase(),
          fechaNacimiento: formattedData.fechaNacimiento,
          estadoCivil: formattedData.estadoCivil,
          sexo: formattedData.sexo,
          telefono: formattedData.telefono,
          direccion: formattedData.direccion,
          idMunicipio: formattedData.municipio,
          idTipoPersona: formattedData.idTipoPersona,
          idProvincia: formattedData.provincia,
        }, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });

        if (response.data.success) {
          notification.success(
            texts.userCreated,
            `${texts.userCreatedDesc} (${formattedData.nombres} ${formattedData.apellidos})`
          );
          handleClose();
        } else {
          // Manejar el caso en que la creación no fue exitosa
          console.error('Error creating user:', response.data.message);
          notification.error(
            texts.updateError,
            texts.updateErrorDesc
          );
        }
      } catch (error) {
        console.error('Error creating employee:', error);
        notification.error(
          texts.updateError,
          texts.updateErrorDesc
        );
        setIsSubmitting(false);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Función para alternar visibilidad de contraseñas
  const togglePasswordVisibility = (field) => {
    if (field === 'newPassword') {
      setShowNewPassword(!showNewPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  // Asegúrate de que GlobalStyle se renderice dentro del componente
  return (
    <>
      <GlobalStyle />
      <Modal 
        show={visible}
        onClose={handleClose} // Use the new handleClose function
        width="800px"
        height="auto"
      >
        <h2>{isEditing ? texts.editUser : texts.createUser}</h2>
        
        {/* Asegúrate de que el Form reciba el objeto form como prop */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={empleadoData || {}}
            className="styled-form"
          >
            <FormContainer>
              <FormRow>
                <Form.Item 
                  label={texts.names}
                  name="nombres"
                  rules={[{ 
                    required: true, 
                    message: texts.enterNames 
                  }]}
                  validateTrigger={['onBlur', 'onChange']}
                >
                  <Inputs placeholder={texts.enterNames} />
                </Form.Item>
                
                <Form.Item
                  label={texts.lastName}
                  name="apellidos"
                  rules={[{ required: true, message: texts.enterLastName }]}
                >
                  <Inputs placeholder={texts.enterLastName} />
                </Form.Item>
              </FormRow>

              <FormRow>
                <Form.Item 
                  label={texts.idNumber}
                  name="cedula"
                  rules={[
                    { required: true, message: texts.enterIdNumber || "Enter your ID" },
                    { 
                      pattern: /^\d{3}-\d{7}-\d{1}$/, 
                      message: texts.invalidCedula 
                    }
                  ]}
                  initialValue={
                    empleadoData?.datosPersonales?.cedula
                    ? empleadoData.datosPersonales.cedula.replace(
                      /^(\d{3})(\d{7})(\d{1})$/,
                      "$1-$2-$3" 
                      )
                    : undefined
                  }
                >
                  <Inputs 
                    placeholder="000-0000000-0"
                    onChange={(e) => {
                      const formatted = formatCedula(e.target.value);
                      form.setFieldsValue({ cedula: formatted });
                    }}
                  />
                </Form.Item>
                
                <Form.Item
                  label={texts.email}
                  name="correo"
                  rules={[
                    { required: true, message: texts.enterEmail },
                    { 
                      type: 'email', 
                      message: texts.invalidEmail 
                    }
                  ]}
                >
                  <Inputs placeholder="ejemplo@correo.com" />
                </Form.Item>
              </FormRow>

              <FormRow>
                <Form.Item
                  label={texts.gender || "Gender"}
                  name="sexo"
                  rules={[{ required: true, message: texts.gender || "Please select your gender" }]}
                  initialValue={empleadoData?.datosPersonales?.sexo}
                >
                  <Select 
                    placeholder={texts.gender || "Select your gender"}
                    style={{ width: '100%', height: '44px' }}
                  >
                    <Select.Option value="M">{language === 'es' ? 'Masculino' : 'Male'}</Select.Option>
                    <Select.Option value="F">{language === 'es' ? 'Femenino' : 'Female'}</Select.Option>
                    <Select.Option value="otro">{language === 'es' ? 'Otro' : 'Other'}</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label={texts.maritalStatus || "Marital Status"}
                  name="estadoCivil"
                  rules={[{ required: true, message: texts.maritalStatus || "Please select your marital status" }]}
                  initialValue={empleadoData?.datosPersonales?.estadoCivil}
                >
                  <Select 
                    placeholder={texts.maritalStatus || "Select your marital status"}
                    style={{ width: '100%', height: '44px' }}
                  >
                    <Select.Option value="soltero">{language === 'es' ? 'Soltero/a' : 'Single'}</Select.Option>
                    <Select.Option value="casado">{language === 'es' ? 'Casado/a' : 'Married'}</Select.Option>
                    <Select.Option value="divorciado">{language === 'es' ? 'Divorciado/a' : 'Divorced'}</Select.Option>
                    <Select.Option value="viudo">{language === 'es' ? 'Viudo/a' : 'Widowed'}</Select.Option>
                  </Select>
                </Form.Item>
              </FormRow>
              
              <FormRow>
                {/* Campo de Nueva Contraseña */}
              {!isEditing && (
                <Form.Item
                  label={texts.newPassword}
                  name="newPassword"
                  rules={[
                    { required: true, message: texts.enterNewPassword },
                    { min: 8, message: texts.passwordTooShort },
                    {
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                      message: texts.passwordInvalid,
                    },
                  ]}
                >
                  <Inputs
                    type={showNewPassword ? 'text' : 'password'} // Cambiar entre texto y contraseña
                    placeholder={texts.newPassword}
                    suffix={
                      showNewPassword ? (
                        <EyeInvisibleOutlined onClick={() => togglePasswordVisibility('newPassword')} />
                      ) : (
                        <EyeOutlined onClick={() => togglePasswordVisibility('newPassword')} />
                      )
                    }
                  />
                </Form.Item>
              )}

              {/* Campo de Confirmar Contraseña */}
              {!isEditing && (
                <Form.Item
                  label={texts.confirmPassword}
                  name="confirmPassword"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: texts.confirmPasswordError },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(texts.confirmPasswordError));
                      },
                    }),
                  ]}
                >
                  <Inputs
                    type={showConfirmPassword ? 'text' : 'password'} // Cambiar entre texto y contraseña
                    placeholder={texts.confirmPassword}
                    suffix={
                      showConfirmPassword ? (
                        <EyeInvisibleOutlined onClick={() => togglePasswordVisibility('confirmPassword')} />
                      ) : (
                        <EyeOutlined onClick={() => togglePasswordVisibility('confirmPassword')} />
                      )
                    }
                  />
                </Form.Item>
              )}
            </FormRow>
            <FormRow>
              <Form.Item
                label={texts.phone}
                name="telefono"
                rules={[
                  { required: true, message: texts.enterPhone || "Enter your phone number" },
                  {
                    pattern: /^\d{3}-\d{3}-\d{4}$/, 
                    message: texts.invalidPhone 
                  }
                ]}
                initialValue={
                  empleadoData?.datosPersonales?.telefono
                  ? empleadoData.datosPersonales.telefono.replace(
                    /^(\d{3})(\d{3})(\d{4})$/,
                    "$1-$2-$3"
                    )
                  : undefined
                }
              >
                <Inputs 
                  placeholder="(000) 000-0000" 
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    form.setFieldsValue({ telefono: formatted });
                  }}
                />
              </Form.Item>

              <Form.Item
                label={texts.birthDate}
                name="fechaNacimiento"
                rules={[{ required: true, message: texts.enterBirthDate }]}
                initialValue={empleadoData?.datosPersonales?.fechaNacimiento ? dayjs(empleadoData.datosPersonales.fechaNacimiento) : null}
              >
                <DatePicker 
                  style={{ 
                    width: '100%', 
                    height: '44px', 
                    borderRadius: '8px'
                  }}
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  locale={language === 'es' ? esES : enUS}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  allowClear={true}
                />
              </Form.Item>
            </FormRow>

            <FormRow>
              <Form.Item
                label={texts.province}
                name="provincia"
                rules={[{ required: true, message: texts.selectProvince }]}
                initialValue={empleadoData?.datosPersonales?.ubicacion?.provincia?.id}
              >
                <Select 
                  placeholder={texts.selectProvince}
                  style={{ width: '100%', height: '44px' }}
                  onChange={handleProvinciaChange}
                >
                  {provincias.map(provincia => (
                    <Select.Option key={provincia.id} value={provincia.id}>
                      {provincia.nombreProvincia}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item
                label={texts.municipality}
                name="municipio"
                rules={[{ required: true, message: texts.selectMunicipality }]}
                initialValue={empleadoData?.datosPersonales?.ubicacion?.municipio?.id}
              >
                <Select 
                  placeholder={texts.selectMunicipality}
                  style={{ width: '100%', height: '44px' }}
                  disabled={empleadoData?.datosPersonales?.ubicacion?.municipio?.id ? false : !selectedProvincia}  // Esta línea ya deshabilita el select
                  onChange={handleMunicipioChange}
                >
                  {municipios.map(municipio => (
                    <Select.Option key={municipio.id} value={municipio.id}>
                      {municipio.nombreMunicipio}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </FormRow>

            <Form.Item
              label={texts.address}
              name="direccion"
              rules={[{ required: true, message: texts.enterAddress }]}
              initialValue={ empleadoData && (`${empleadoData?.datosPersonales?.ubicacion?.direccion}`)}
            >
              <Inputs placeholder={texts.enterAddress} />
            </Form.Item>

            {/* Add the typeUser selector field here */}
            <Form.Item
              label={texts.typeUser}
              name="idTipoUsuario"
              rules={[{ required: true, message: texts.typeUserPlaceholder }]}
              initialValue={empleadoData?.tipoUsuario?.id}
            >
              <Select 
              style={{ width: '100%', height: '44px' }}
              placeholder={texts.typeUserPlaceholder}
              optionLabelProp="label"
              >
              {typeUser.map(role => (
                <Select.Option key={role.value} value={role.value} label={role.label}>
                {role.label}
                </Select.Option>
              ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              label={texts.cargo}
              name="idTipoPersona"
              rules={[{ required: true, message: texts.selectRole }]}
              initialValue={empleadoData?.datosPersonales?.tipoPersona?.id}
            >
              <Select 
              style={{ width: '100%', height: '44px' }}
              placeholder={texts.selectRole}
              optionLabelProp="label"
              >
              {cargos.map(cargo => (
                <Select.Option key={cargo.idtipopersona} value={cargo.idtipopersona} label={cargo.nombre}>
                {cargo.nombre}
                </Select.Option>
              ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={texts.status}
              name="estado"
              rules={[{ required: true, message: 'Por favor seleccione un estado' }]}
            >
              <Select 
                style={{ width: '100%', height: '44px' }}
                placeholder={texts.status}
              >
                <Select.Option value="activo">{texts.active}</Select.Option>
                <Select.Option value="deshabilitado">{texts.disabled}</Select.Option>
              </Select>
            </Form.Item>

            <ButtonsContainer>
              <SecondaryButton onClick={handleClose}>
                {texts.cancel}
              </SecondaryButton>
              <MainButton 
                type="primary"
                onClick={() => {
                  form.validateFields()
                    .then((values) => {
                      handleSubmit(values);
                    })
                    .catch((info) => {
                      // Mostrar notificación de error
                      notification.error(
                        texts.validationError,
                        texts.validationErrorDesc
                      );
                      
                      // Código existente para el manejo de errores
                      const errorFields = info.errorFields;
                      
                      // Scroll al primer campo con error
                      const firstErrorField = errorFields[0]?.name[0];
                      if (firstErrorField) {
                        const fieldElement = document.querySelector(`[id$=_${firstErrorField}]`);
                        if (fieldElement) {
                          fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          // Opcional: destacar visualmente el campo con error
                          fieldElement.focus();
                        }
                      }
                    });
                }}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isEditing ? texts.save : texts.create}
              </MainButton>
            </ButtonsContainer>
          </FormContainer>
        </Form>
      </Modal>
    </>
  );
};

export default CrearEditarEmpleado;
