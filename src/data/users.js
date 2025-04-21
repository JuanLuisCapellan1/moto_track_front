/**
 * Mock users data for development and testing
 * DO NOT use in production - replace with actual API calls
 */

const users = [
  {
    id: "admin-001",
    username: "admin",
    email: "admin@mototrack.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "Principal",
    role: "admin",
    createdAt: "2023-01-01T10:00:00Z",
    permissions: ["all"],
    profileImage: "https://i.pravatar.cc/150?img=1",
    idPersona: null
  },
  {
    id: "emp-001",
    username: "empleado1",
    email: "empleado1@mototrack.com",
    password: "emp123",
    firstName: "Juan",
    lastName: "Pérez",
    role: "empleado",
    department: "Atención al Cliente",
    createdAt: "2023-01-15T09:30:00Z",
    permissions: ["read", "update"],
    profileImage: "https://i.pravatar.cc/150?img=27",
    idPersona: 2
  },
  {
    id: "emp-002",
    username: "empleado2",
    email: "empleado2@mototrack.com",
    password: "emp123",
    firstName: "María",
    lastName: "González",
    role: "empleado",
    department: "Soporte Técnico",
    createdAt: "2023-02-05T11:45:00Z",
    permissions: ["read", "update"],
    profileImage: "https://i.pravatar.cc/150?img=3",
    idPersona: 3
  },
  {
    id: "cit-001",
    username: "ciudadano1",
    email: "ciudadano1@example.com",
    password: "cit123",
    firstName: "Carlos",
    lastName: "Rodríguez",
    role: "ciudadano",
    document: "1234567890",
    createdAt: "2023-03-10T14:20:00Z",
    vehicleInfo: {
      plate: "ABC123",
      model: "Honda CBR 600",
      year: 2022,
      color: "Rojo"
    },
    profileImage: "https://i.pravatar.cc/150?img=4",
    idPersona: 1
  },
  {
    id: "cit-002",
    username: "ciudadano2",
    email: "ciudadano2@example.com",
    password: "cit123",
    firstName: "Laura",
    lastName: "Martínez",
    role: "ciudadano",
    document: "0987654321",
    createdAt: "2023-04-15T16:10:00Z",
    vehicleInfo: {
      plate: "XYZ789",
      model: "Yamaha YZF R6",
      year: 2021,
      color: "Azul"
    },
    profileImage: "https://i.pravatar.cc/150?img=5",
    idPersona: 4
  }
];

// Helper function to find a user by credentials
export const findUserByCredentials = (email, password) => {
  return users.find(user => user.email === email && user.password === password) || null;
};

// Helper function to find a user by id
export const findUserById = (id) => {
  return users.find(user => user.id === id) || null;
};

// Helper function to find a user by email
export const findUserByEmail = (email) => {
  return users.find(user => user.email === email) || null;
};

export default users;