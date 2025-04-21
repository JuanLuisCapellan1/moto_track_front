import { MOTO_STATUS } from '../components/Dashboard/CommonComponts/StatusTag';

// Shared motorcycle data
export const mockMotocicletas = {
  activas: [
    {
      id: 1,
      modelo: 'Honda CBR 250',
      estado: MOTO_STATUS.APROBADA,
      placa: 'K123456',
      chasis: 'JH2PC35G1MM200020',
      fechaRegistro: '14/01/2023',
      tipoUso: 'Personal',
    },
    // {
    //   id: 2,
    //   modelo: 'Yamaha R15',
    //   estado: MOTO_STATUS.APROBADA,
    //   placa: 'P789012',
    //   chasis: 'ME1RG4410L0025789',
    //   fechaRegistro: '02/03/2023',
    //   tipoUso: 'Comercial',
    // }
  ],
  pendientes: [
    {
      id: 3,
      modelo: 'Suzuki GSX-R150',
      estado: MOTO_STATUS.PENDIENTE,
      placa: 'En trámite',
      chasis: 'MB8NG4813L0179423',
      fechaRegistro: '10/03/2023',
      tipoUso: 'Personal'
    }
  ],
  rechazadas: [
    {
      id: 4,
      modelo: 'Kawasaki Ninja 400',
      estado: MOTO_STATUS.RECHAZADA,
      placa: 'Rechazada',
      chasis: 'JKAEXMJ13LDA12345',
      fechaRegistro: '05/02/2023',
      tipoUso: 'Personal',
      motivoRechazo: 'Documentación incompleta',
    }
  ]
};

// Helper function to find motorcycle by ID
export const findMotoById = (id) => {
  const numId = Number(id);

  for (const category of ['activas', 'pendientes', 'rechazadas']) {
    const found = mockMotocicletas[category].find(moto => moto.id === numId);
    if (found) return found;
  }

  return null;
};

// Function to check if user has reached the motorcycle limit
export const checkMotorcycleLimit = async () => {
  // This would be an API call in production
  // For now, we'll return the mock data count
  return mockMotocicletas.activas.length;
};

// Check if the user has reached the maximum number of active motorcycles (2)
export const hasReachedActiveLimit = mockMotocicletas.activas.length >= 2;