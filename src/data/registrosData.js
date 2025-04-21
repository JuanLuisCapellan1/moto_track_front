export const REGISTRO_STATUS = {
  APROBADO: 'MOTO_APROBADA',
  PENDIENTE: 'MOTO_PENDIENTE',
  RECHAZADO: 'MOTO_RECHAZADA'
};

export const registrosData = [
  {
    id: 1,
    fechaSolicitud: '2024-03-28T14:30:00Z',
    estado: REGISTRO_STATUS.APROBADO,
    aprobacionDetalles: {
      aprobadoPor: "Lic. María Rodríguez",
      fechaAprobacion: "2024-03-30T10:15:00Z",
      numeroPlacaAsignado: "K123456",
      observaciones: "Solicitud aprobada. La documentación presentada cumple con todos los requisitos establecidos por el departamento de tránsito. Verificación de chasis realizada con éxito.",
      historial: [
        {
          estado: "Approved",
          fecha: "2024-03-30T10:15:00Z",
          responsable: "Lic. María Rodríguez",
          descripcion: "Solicitud aprobada y placa asignada. Documentación completa."
        },
        {
          estado: "In Review",
          fecha: "2024-03-29T14:30:00Z",
          responsable: "Técnico Juan Pérez",
          descripcion: "Documentación en revisión. Verificación de seguro y datos técnicos."
        },
        {
          estado: "Received",
          fecha: "2024-03-28T14:30:00Z",
          responsable: "Sistema",
          descripcion: "Solicitud recibida y registrada en el sistema."
        }
      ]
    },
    datosPersonales: {
      nombreCompleto: 'Carlos Alberto Rodríguez Méndez',
      sexo: 'Masculino',
      cedula: '001-1234567-8',
      telefono: '809-555-1234',
      estadoCivil: 'Casado',
      fechaNacimiento: '1985-05-15',
      correoElectronico: 'carlos.rodriguez@example.com',
      sector: 'Piantini',
      direccion: 'Calle Principal #45, Edificio Aurora, Apto 302'
    },
    datosMotocicleta: {
      marca: 'Honda',
      modelo: 'CBR 250',
      año: '2022',
      color: 'Negro',
      cilindraje: '250',
      tipoUso: 'Personal',
      numeroChasis: 'JH2PC35G1MM200020',
      seguro: 'Si',
      proveedorSeguro: 'Seguros Patria',
      numeroPoliza: 'MOTO-2022-78945',
      placa: 'K123456'
    },
    documentos: {
      licenciaConducir: '/assets/Dashboard/CiudadanoDashboard/licencia2.jpg',
      seguroVehiculo: '/assets/Dashboard/CiudadanoDashboard/erseguro.png',
      cedulaIdentidad: '/assets/Dashboard/CiudadanoDashboard/754CEDULARD800.jpg',
      facturaMotor: '/assets/Dashboard/CiudadanoDashboard/facturademotor.jpg'
    }
  },
  {
    id: 2,
    fechaSolicitud: '2024-03-31T09:00:00Z',
    estado: REGISTRO_STATUS.PENDIENTE,
    pendienteDetalles: {
      historial: [
        {
          estado: "Document Review",
          fecha: "2024-04-01T09:15:00Z",
          responsable: "Técnico Juan Pérez",
          descripcion: "Documentación en revisión por el departamento de tránsito"
        },
        {
          estado: "Received",
          fecha: "2024-03-31T09:00:00Z",
          responsable: "Sistema",
          descripcion: "Solicitud recibida y registrada en el sistema"
        }
      ]
    },
    datosPersonales: {
      nombreCompleto: 'María Isabel Santos Peña',
      sexo: 'Femenino',
      cedula: '402-2345678-9',
      telefono: '829-555-4321',
      estadoCivil: 'Soltera',
      fechaNacimiento: '1990-09-22',
      correoElectronico: 'maria.santos@example.com',
      sector: 'Naco',
      direccion: 'Av. Principal #78, Residencial Las Palmas'
    },
    datosMotocicleta: {
      marca: 'Yamaha',
      modelo: 'FZ-25',
      año: '2023',
      color: 'Azul',
      cilindraje: '250',
      tipoUso: 'Comercial',
      numeroChasis: 'YM2FZ25G2NN300030',
      seguro: 'Si',
      proveedorSeguro: 'Seguros Universal',
      numeroPoliza: 'MOTO-2023-65432',
      placa: 'L789012'
    },
    documentos: {
      licenciaConducir: '/assets/Dashboard/CiudadanoDashboard/licencia2.jpg',
      seguroVehiculo: '/assets/Dashboard/CiudadanoDashboard/erseguro.png',
      cedulaIdentidad: '/assets/Dashboard/CiudadanoDashboard/754CEDULARD800.jpg',
      facturaMotor: '/assets/Dashboard/CiudadanoDashboard/facturademotor.jpg'
    }
  },
  {
    id: 3,
    fechaSolicitud: '2024-03-25T11:20:00Z',
    estado: REGISTRO_STATUS.RECHAZADO,
    rechazoDetalles: {
      rechazadoPor: "Lic. Carlos González",
      fechaRechazo: "2024-03-27T15:30:00Z",
      motivoRechazo: "Falta información esencial: la cédula presenta omisiones y la póliza está desactualizada.",
      detallesRechazo: "La copia de la cédula de identidad está incompleta. Falta el reverso del documento. Además, la póliza de seguro presentada está vencida.",
      historial: [
        {
          estado: "Rejected",
          fecha: "2024-03-27T15:30:00Z",
          responsable: "Lic. Carlos González",
          descripcion: "Solicitud rechazada por documentación incompleta según normativa vigente."
        },
        {
          estado: "In Review",
          fecha: "2024-03-26T13:40:00Z",
          responsable: "Técnico Ana Martínez",
          descripcion: "Documentación en revisión por el departamento de tránsito"
        },
        {
          estado: "Received",
          fecha: "2024-03-25T11:20:00Z",
          responsable: "Sistema",
          descripcion: "Solicitud recibida y registrada en el sistema"
        }
      ]
    },
    datosPersonales: {
      nombreCompleto: 'Juan Pablo Mejía Hernández',
      sexo: 'Masculino',
      cedula: '001-7894561-2',
      telefono: '809-555-7890',
      estadoCivil: 'Soltero',
      fechaNacimiento: '1995-08-12',
      correoElectronico: 'juan.mejia@example.com',
      sector: 'Los Ríos',
      direccion: 'Calle 5ta #23, Residencial Del Este'
    },
    datosMotocicleta: {
      marca: 'Suzuki',
      modelo: 'GSX-R150',
      año: '2021',
      color: 'Rojo',
      cilindraje: '150',
      tipoUso: 'Personal',
      numeroChasis: 'SZ2GS15G3KL400040',
      seguro: 'No',
      proveedorSeguro: '',
      numeroPoliza: '',
      placa: 'N987654'
    },
    documentos: {
      licenciaConducir: '/assets/Dashboard/CiudadanoDashboard/licencia2.jpg',
      seguroVehiculo: '/assets/Dashboard/CiudadanoDashboard/erseguro.png',
      cedulaIdentidad: '/assets/Dashboard/CiudadanoDashboard/754CEDULARD800.jpg',
      facturaMotor: '/assets/Dashboard/CiudadanoDashboard/facturademotor.jpg'
    }
  },
  {
    id: 4,
    fechaSolicitud: '2024-03-20T09:15:00Z',
    estado: REGISTRO_STATUS.APROBADO,
    aprobacionDetalles: {
      aprobadoPor: "Lic. Roberto Sánchez",
      fechaAprobacion: "2024-03-22T11:30:00Z",
      numeroPlacaAsignado: "P234567",
      observaciones: "Solicitud procesada y aprobada. Todos los documentos presentados están conformes a la normativa vigente. Póliza de seguro verificada con el proveedor.",
      historial: [
        {
          estado: "Approved",
          fecha: "2024-03-22T11:30:00Z",
          responsable: "Lic. Roberto Sánchez",
          descripcion: "Solicitud aprobada y placa asignada. Expediente completo."
        },
        {
          estado: "In Review",
          fecha: "2024-03-21T10:45:00Z",
          responsable: "Técnico Laura Méndez",
          descripcion: "Verificación de documentos y número de chasis completada."
        },
        {
          estado: "Received",
          fecha: "2024-03-20T09:15:00Z",
          responsable: "Sistema",
          descripcion: "Solicitud recibida y registrada en el sistema"
        }
      ]
    },
    datosPersonales: {
      nombreCompleto: 'Ana Carolina Pérez Silva',
      sexo: 'Femenino',
      cedula: '402-9876543-1',
      telefono: '829-555-6543',
      estadoCivil: 'Casada',
      fechaNacimiento: '1988-11-30',
      correoElectronico: 'ana.perez@example.com',
      sector: 'Bella Vista',
      direccion: 'Av. Sarasota #145, Torre Empresarial, Apto 701'
    },
    datosMotocicleta: {
      marca: 'KTM',
      modelo: 'Duke 200',
      año: '2023',
      color: 'Naranja',
      cilindraje: '200',
      tipoUso: 'Personal',
      numeroChasis: 'KT2DK20G4NP500050',
      seguro: 'Si',
      proveedorSeguro: 'Seguros Sura',
      numeroPoliza: 'MOTO-2023-98765',
      placa: 'P234567'
    },
    documentos: {
      licenciaConducir: '/assets/Dashboard/CiudadanoDashboard/licencia2.jpg',
      seguroVehiculo: '/assets/Dashboard/CiudadanoDashboard/erseguro.png',
      cedulaIdentidad: '/assets/Dashboard/CiudadanoDashboard/754CEDULARD800.jpg',
      facturaMotor: '/assets/Dashboard/CiudadanoDashboard/facturademotor.jpg'
    }
  },
  {
    id: 5,
    fechaSolicitud: '2024-03-29T13:45:00Z',
    estado: REGISTRO_STATUS.PENDIENTE,
    pendienteDetalles: {
      historial: [
        {
          estado: "In Review",
          fecha: "2024-03-30T10:20:00Z",
          responsable: "Técnico Miguel Torres",
          descripcion: "Verificación de número de chasis en proceso"
        },
        {
          estado: "Document Review",
          fecha: "2024-03-29T16:30:00Z",
          responsable: "Técnico Carmen Vásquez",
          descripcion: "Documentación en revisión por el departamento técnico"
        },
        {
          estado: "Received",
          fecha: "2024-03-29T13:45:00Z",
          responsable: "Sistema",
          descripcion: "Solicitud recibida y registrada en el sistema"
        }
      ]
    },
    datosPersonales: {
      nombreCompleto: 'Luis Eduardo Ramírez Torres',
      sexo: 'Masculino',
      cedula: '223-4567890-3',
      telefono: '809-555-2345',
      estadoCivil: 'Soltero',
      fechaNacimiento: '1992-04-15',
      correoElectronico: 'luis.ramirez@example.com',
      sector: 'Evaristo Morales',
      direccion: 'Calle Luis F. Thomen #302'
    },
    datosMotocicleta: {
      marca: 'Kawasaki',
      modelo: 'Ninja 400',
      año: '2024',
      color: 'Verde',
      cilindraje: '400',
      tipoUso: 'Deportivo',
      numeroChasis: 'KW4NJ40G5PP600060',
      seguro: 'Si',
      proveedorSeguro: 'La Colonial',
      numeroPoliza: 'MOTO-2024-12345',
      placa: 'R345678'
    },
    documentos: {
      licenciaConducir: '/assets/Dashboard/CiudadanoDashboard/licencia2.jpg',
      seguroVehiculo: '/assets/Dashboard/CiudadanoDashboard/erseguro.png',
      cedulaIdentidad: '/assets/Dashboard/CiudadanoDashboard/754CEDULARD800.jpg',
      facturaMotor: '/assets/Dashboard/CiudadanoDashboard/facturademotor.jpg'
    }
  },
  {
    id: 6,
    fechaSolicitud: '2024-03-15T10:30:00Z',
    estado: REGISTRO_STATUS.RECHAZADO,
    rechazoDetalles: {
      rechazadoPor: "Lic. Héctor Jiménez",
      fechaRechazo: "2024-03-17T14:15:00Z",
      motivoRechazo: "Inconsistencias en la documentación: datos conflictivos en la factura y el número de chasis.",
      detallesRechazo: "La información proporcionada en la factura del motor no coincide con el número de chasis físico de la motocicleta. Además, la fecha de vigencia del seguro es posterior a la fecha de solicitud.",
      historial: [
        {
          estado: "Rejected",
          fecha: "2024-03-17T14:15:00Z",
          responsable: "Lic. Héctor Jiménez",
          descripcion: "Solicitud rechazada por inconsistencias en documentación"
        },
        {
          estado: "Technical Verification",
          fecha: "2024-03-16T11:00:00Z",
          responsable: "Ing. Rafael Moreno",
          descripcion: "Verificación técnica del vehículo no superada"
        },
        {
          estado: "In Review",
          fecha: "2024-03-15T13:20:00Z",
          responsable: "Técnico Diana Castillo",
          descripcion: "Documentación en revisión por el departamento de tránsito"
        },
        {
          estado: "Received",
          fecha: "2024-03-15T10:30:00Z",
          responsable: "Sistema",
          descripcion: "Solicitud recibida y registrada en el sistema"
        }
      ]
    },
    datosPersonales: {
      nombreCompleto: 'Carmen Rosa Medina Acosta',
      sexo: 'Femenino',
      cedula: '001-8765432-0',
      telefono: '829-555-8901',
      estadoCivil: 'Divorciada',
      fechaNacimiento: '1983-07-22',
      correoElectronico: 'carmen.medina@example.com',
      sector: 'Gazcue',
      direccion: 'Av. Independencia #78, Edif. María, Apto 401'
    },
    datosMotocicleta: {
      marca: 'BMW',
      modelo: 'G 310 R',
      año: '2022',
      color: 'Blanco',
      cilindraje: '310',
      tipoUso: 'Personal',
      numeroChasis: 'BW3G31G6ML700070',
      seguro: 'Si',
      proveedorSeguro: 'Mapfre',
      numeroPoliza: 'MOTO-2022-34567',
      placa: 'S456789'
    },
    documentos: {
      licenciaConducir: '/assets/Dashboard/CiudadanoDashboard/licencia2.jpg',
      seguroVehiculo: '/assets/Dashboard/CiudadanoDashboard/erseguro.png',
      cedulaIdentidad: '/assets/Dashboard/CiudadanoDashboard/754CEDULARD800.jpg',
      facturaMotor: '/assets/Dashboard/CiudadanoDashboard/facturademotor.jpg'
    }
  },
  {
    id: 7,
    fechaSolicitud: '2024-03-27T15:00:00Z',
    estado: REGISTRO_STATUS.APROBADO,
    aprobacionDetalles: {
      aprobadoPor: "Lic. Juana Martínez",
      fechaAprobacion: "2024-03-29T09:45:00Z",
      numeroPlacaAsignado: "T567890",
      observaciones: "Solicitud aprobada con prioridad por tratarse de un vehículo de uso comercial. Todos los documentos cumplen con los requisitos del departamento de tránsito. Seguro verificado y válido.",
      historial: [
        {
          estado: "Approved",
          fecha: "2024-03-29T09:45:00Z",
          responsable: "Lic. Juana Martínez",
          descripcion: "Solicitud aprobada y placa asignada. Proceso completado."
        },
        {
          estado: "Technical Verification",
          fecha: "2024-03-28T14:30:00Z",
          responsable: "Ing. Marcos Lora",
          descripcion: "Verificación técnica del vehículo completada satisfactoriamente"
        },
        {
          estado: "In Review",
          fecha: "2024-03-27T16:20:00Z",
          responsable: "Técnico Pedro Ramírez",
          descripcion: "Documentación en revisión prioritaria por uso comercial"
        },
        {
          estado: "Received",
          fecha: "2024-03-27T15:00:00Z",
          responsable: "Sistema",
          descripcion: "Solicitud recibida y registrada en el sistema"
        }
      ]
    },
    datosPersonales: {
      nombreCompleto: 'Roberto José Sánchez Luna',
      sexo: 'Masculino',
      cedula: '402-1234567-4',
      telefono: '809-555-3456',
      estadoCivil: 'Casado',
      fechaNacimiento: '1987-12-05',
      correoElectronico: 'roberto.sanchez@example.com',
      sector: 'Paraíso',
      direccion: 'Calle 27 de Febrero #189'
    },
    datosMotocicleta: {
      marca: 'Bajaj',
      modelo: 'Pulsar NS200',
      año: '2023',
      color: 'Negro Mate',
      cilindraje: '200',
      tipoUso: 'Comercial',
      numeroChasis: 'BJ2PL20G7NR800080',
      seguro: 'Si',
      proveedorSeguro: 'Seguros Pepín',
      numeroPoliza: 'MOTO-2023-45678',
      placa: 'T567890'
    },
    documentos: {
      licenciaConducir: '/assets/Dashboard/CiudadanoDashboard/licencia2.jpg',
      seguroVehiculo: '/assets/Dashboard/CiudadanoDashboard/erseguro.png',
      cedulaIdentidad: '/assets/Dashboard/CiudadanoDashboard/754CEDULARD800.jpg',
      facturaMotor: '/assets/Dashboard/CiudadanoDashboard/facturademotor.jpg'
    }
  },
  {
    id: 8,
    fechaSolicitud: '2024-03-18T08:45:00Z',
    estado: REGISTRO_STATUS.RECHAZADO,
    rechazoDetalles: {
      rechazadoPor: "Lic. Fernando Álvarez",
      fechaRechazo: "2024-03-20T13:10:00Z",
      motivoRechazo: "El vehículo presenta modificaciones no autorizadas en el sistema de escape y alteraciones en el número de chasis.",
      detallesRechazo: "Según la verificación técnica, la motocicleta presenta modificaciones no autorizadas en el sistema de escape que no cumplen con las normativas de emisiones vigentes. Además, el número de chasis muestra signos de alteración.",
      historial: [
        {
          estado: "Rejected",
          fecha: "2024-03-20T13:10:00Z",
          responsable: "Lic. Fernando Álvarez",
          descripcion: "Solicitud rechazada por incumplimiento técnico según normativa."
        },
        {
          estado: "Technical Inspection",
          fecha: "2024-03-19T15:40:00Z",
          responsable: "Ing. Claudia Mejía",
          descripcion: "Inspección física revela modificaciones no autorizadas"
        },
        {
          estado: "In Review",
          fecha: "2024-03-18T10:30:00Z",
          responsable: "Técnico Luis Gómez",
          descripcion: "Documentación en revisión por el departamento técnico"
        },
        {
          estado: "Received",
          fecha: "2024-03-18T08:45:00Z",
          responsable: "Sistema",
          descripcion: "Solicitud recibida y registrada en el sistema"
        }
      ]
    },
    datosPersonales: {
      nombreCompleto: 'Patricia Elena Guzmán Díaz',
      sexo: 'Femenino',
      cedula: '223-9876543-5',
      telefono: '829-555-9012',
      estadoCivil: 'Soltera',
      fechaNacimiento: '1994-02-28',
      correoElectronico: 'patricia.guzman@example.com',
      sector: 'Ensanche Ozama',
      direccion: 'Calle Emma Balaguer #45'
    },
    datosMotocicleta: {
      marca: 'TVS',
      modelo: 'Apache RTR 160',
      año: '2021',
      color: 'Rojo Racing',
      cilindraje: '160',
      tipoUso: 'Personal',
      numeroChasis: 'TV1AP16G8KL900090',
      seguro: 'Si',
      proveedorSeguro: 'Seguros Universal',
      numeroPoliza: 'MOTO-2021-56789',
      placa: 'U678901'
    },
    documentos: {
      licenciaConducir: '/assets/Dashboard/CiudadanoDashboard/licencia2.jpg',
      seguroVehiculo: '/assets/Dashboard/CiudadanoDashboard/erseguro.png',
      cedulaIdentidad: '/assets/Dashboard/CiudadanoDashboard/754CEDULARD800.jpg',
      facturaMotor: '/assets/Dashboard/CiudadanoDashboard/facturademotor.jpg'
    }
  },
  {
    id: 9,
    fechaSolicitud: '2024-03-24T11:30:00Z',
    estado: REGISTRO_STATUS.PENDIENTE,
    pendienteDetalles: {
      historial: [
        {
          estado: "Waiting for Applicant",
          fecha: "2024-03-25T14:50:00Z",
          responsable: "Técnico Sandra Núñez",
          descripcion: "Se solicitó información adicional sobre el proveedor del seguro"
        },
        {
          estado: "In Review",
          fecha: "2024-03-24T14:20:00Z",
          responsable: "Técnico Raúl Hernández",
          descripcion: "Documentación en revisión por el departamento de tránsito"
        },
        {
          estado: "Received",
          fecha: "2024-03-24T11:30:00Z",
          responsable: "Sistema",
          descripcion: "Solicitud recibida y registrada en el sistema"
        }
      ]
    },
    datosPersonales: {
      nombreCompleto: 'Miguel Ángel Ferreira Pujols',
      sexo: 'Masculino',
      cedula: '402-8765432-6',
      telefono: '809-555-4567',
      estadoCivil: 'Soltero',
      fechaNacimiento: '1996-09-18',
      correoElectronico: 'miguel.ferreira@example.com',
      sector: 'Los Jardines',
      direccion: 'Av. Rómulo Betancourt #234'
    },
    datosMotocicleta: {
      marca: 'Royal Enfield',
      modelo: 'Meteor 350',
      año: '2024',
      color: 'Azul Marino',
      cilindraje: '350',
      tipoUso: 'Personal',
      numeroChasis: 'RE3MT35G9PP000100',
      seguro: 'Si',
      proveedorSeguro: 'La Monumental',
      numeroPoliza: 'MOTO-2024-67890',
      placa: 'V789012'
    },
    documentos: {
      licenciaConducir: '/assets/Dashboard/CiudadanoDashboard/licencia2.jpg',
      seguroVehiculo: '/assets/Dashboard/CiudadanoDashboard/erseguro.png',
      cedulaIdentidad: '/assets/Dashboard/CiudadanoDashboard/754CEDULARD800.jpg',
      facturaMotor: '/assets/Dashboard/CiudadanoDashboard/facturademotor.jpg'
    }
  },
  {
    id: 10,
    fechaSolicitud: '2024-03-22T14:20:00Z',
    estado: REGISTRO_STATUS.APROBADO,
    aprobacionDetalles: {
      aprobadoPor: "Lic. Antonio Polanco",
      fechaAprobacion: "2024-03-24T11:05:00Z",
      numeroPlacaAsignado: "W890123",
      observaciones: "Solicitud aprobada sin observaciones. Todos los documentos fueron verificados minuciosamente y están en cumplimiento con las regulaciones vigentes. Placa asignada según el número secuencial.",
      historial: [
        {
          estado: "Approved",
          fecha: "2024-03-24T11:05:00Z",
          responsable: "Lic. Antonio Polanco",
          descripcion: "Solicitud aprobada y placa asignada. Expediente completo."
        },
        {
          estado: "Technical Verification",
          fecha: "2024-03-23T13:40:00Z",
          responsable: "Ing. Daniela Rosario",
          descripcion: "Verificación física del vehículo completada satisfactoriamente"
        },
        {
          estado: "Document Verification",
          fecha: "2024-03-23T09:15:00Z",
          responsable: "Técnico José Almonte",
          descripcion: "Verificación de autenticidad de documentos completada"
        },
        {
          estado: "In Review",
          fecha: "2024-03-22T15:30:00Z",
          responsable: "Técnico Mariana Cuevas",
          descripcion: "Documentación en revisión por el departamento de tránsito"
        },
        {
          estado: "Received",
          fecha: "2024-03-22T14:20:00Z",
          responsable: "Sistema",
          descripcion: "Solicitud recibida y registrada en el sistema"
        }
      ]
    },
    datosPersonales: {
      nombreCompleto: 'Laura Victoria Féliz Matos',
      sexo: 'Femenino',
      cedula: '001-2345678-7',
      telefono: '829-555-5678',
      estadoCivil: 'Casada',
      fechaNacimiento: '1991-06-25',
      correoElectronico: 'laura.feliz@example.com',
      sector: 'Mirador Norte',
      direccion: 'Calle Los Próceres #67, Residencial Las Américas'
    },
    datosMotocicleta: {
      marca: 'Benelli',
      modelo: 'TNT 300',
      año: '2023',
      color: 'Plata',
      cilindraje: '300',
      tipoUso: 'Personal',
      numeroChasis: 'BN3TN30G0NM100110',
      seguro: 'Si',
      proveedorSeguro: 'Seguros Banreservas',
      numeroPoliza: 'MOTO-2023-78901',
      placa: 'W890123'
    },
    documentos: {
      licenciaConducir: '/assets/Dashboard/CiudadanoDashboard/licencia2.jpg',
      seguroVehiculo: '/assets/Dashboard/CiudadanoDashboard/erseguro.png',
      cedulaIdentidad: '/assets/Dashboard/CiudadanoDashboard/754CEDULARD800.jpg',
      facturaMotor: '/assets/Dashboard/CiudadanoDashboard/facturademotor.jpg'
    }
  }
];