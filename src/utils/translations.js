// Create this new file for translations

export const translations = {
  // Header translations
  header: {
    titles: {
      adminPanel: {
        es: "Panel de Administración",
        en: "Admin Panel"
      },
      employeePanel: {
        es: "Panel de Empleado",
        en: "Employee Panel"
      },
      controlPanel: {
        es: "Panel de Control",
        en: "Control Panel"
      },
      profile: {
        es: "Mi Perfil",
        en: "My Profile"
      },
      vehicles: {
        es: "Mis Vehículos",
        en: "My Vehicles"
      },
      transactions: {
        es: "Trámites",
        en: "Transactions"
      },
      fines: {
        es: "Multas",
        en: "Fines"
      },
      userManagement: {
        es: "Gestión de Usuarios",
        en: "User Management"
      }
    },
    subtitles: {
      adminSystem: {
        es: "Gestión del sistema MotoTrack",
        en: "MotoTrack system management"
      },
      employeeServices: {
        es: "Gestión de trámites y servicios",
        en: "Transaction and service management"
      },
      motorcycleManagement: {
        es: "Gestión de motocicletas y trámites",
        en: "Motorcycle and transaction management"
      },
      personalInfo: {
        es: "Información personal",
        en: "Personal information"
      },
      registeredMotorcycles: {
        es: "Gestión de motocicletas registradas",
        en: "Management of registered motorcycles"
      },
      requestsManagement: {
        es: "Gestión de trámites y solicitudes",
        en: "Management of transactions and requests"
      },
      finesPayment: {
        es: "Consulta y pago de multas",
        en: "Inquiry and payment of fines"
      },
      systemUsers: {
        es: "Administración de usuarios del sistema",
        en: "System user administration"
      },
      welcome: {
        es: "Bienvenido al Sistema de Registro y Control de Motocicletas",
        en: "Welcome to the Motorcycle Registration and Control System"
      }
    }
  },
  
  // Sidebar translations
  sidebar: {
    dashboard: {
      es: "Dashboard",
      en: "Dashboard" 
    },
    requests: {
      es: "Solicitudes",
      en: "Requests"
    },
    employees: {
      es: "Empleados",
      en: "Employees"
    },
    management: {
      es: "Gestión",
      en: "Management"
    },
    register: {
      es: "Registrar",
      en: "Register"
    },
    motorcycles: {
      es: "Mis Motocicletas",
      en: "My Motorcycles"
    },
    logout: {
      es: "Cerrar Sesión",
      en: "Logout"
    }
  },
  
  // Profile dropdown translations
  profile: {
    header: {
      profile: {
        es: "Tu Perfil",
        en: "Your Profile"
      },
      settings: {
        es: "Ajustes de cuenta",
        en: "Account settings"
      }
    },
    theme: {
      lightMode: {
        es: "Modo Claro",
        en: "Light Mode"
      },
      darkMode: {
        es: "Modo Oscuro",
        en: "Dark Mode"
      },
      changeTheme: {
        es: "Cambiar Tema",
        en: "Change Theme"
      }
    },
    color: {
      mainColor: {
        es: "Color Principal",
        en: "Main Color"
      },
      customize: {
        es: "Personalizar Tema",
        en: "Customize Theme"
      },
      purple: {
        es: "Morado",
        en: "Purple"
      },
      black: {
        es: "Negro",
        en: "Black"
      },
      white: {
        es: "Blanco",
        en: "White"
      },
      blue: {
        es: "Azul",
        en: "Blue"
      },
      pink: {
        es: "Rosado",
        en: "Pink"
      },
      green: {
        es: "Verde",
        en: "Green"
      },
      orange: {
        es: "Naranja",
        en: "Orange"
      },
      red: {
        es: "Rojo",
        en: "Red"
      },
      customColor: {
        es: "Color personalizado:",
        en: "Custom color:"
      },
      apply: {
        es: "Aplicar",
        en: "Apply"
      }
    },
    editProfile: {
      title: {
        es: "Editar Perfil",
        en: "Edit Profile"
      },
      subtitle: {
        es: "Modificar información",
        en: "Modify information"
      }
    },
    changePassword: {
      title: {
        es: "Cambiar contraseña",
        en: "Change Password"
      },
      subtitle: {
        es: "Actualizar clave de acceso",
        en: "Update access key"
      }
    },
    logout: {
      title: {
        es: "Cierre Sesión",
        en: "Logout"
      },
      subtitle: {
        es: "Finalizar Sesión",
        en: "End Session"
      }
    }
  },
  
  // Modal translations
  modals: {
    // General modal buttons
    buttons: {
      ok: {
        es: "Aceptar",
        en: "OK"
      },
      cancel: {
        es: "Cancelar",
        en: "Cancel"
      },
      yes: {
        es: "Sí",
        en: "Yes"
      },
      no: {
        es: "No",
        en: "No"
      },
      save: {
        es: "Guardar",
        en: "Save"
      },
      delete: {
        es: "Eliminar",
        en: "Delete"
      }
    },
    // Confirmation dialogs
    confirm: {
      logout: {
        title: {
          es: "¿Cerrar sesión?",
          en: "Logout?"
        },
        content: {
          es: "¿Está seguro que desea cerrar la sesión?",
          en: "Are you sure you want to log out?"
        }
      },
      delete: {
        title: {
          es: "¿Eliminar elemento?",
          en: "Delete item?"
        },
        content: {
          es: "Esta acción no se puede deshacer.",
          en: "This action cannot be undone."
        }
      }
    }
  }
};

// Helper function to get translated text
export const getTranslation = (path, language = 'es') => {
  const keys = path.split('.');
  let result = translations;
  
  for (const key of keys) {
    if (result[key] === undefined) {
      console.warn(`Translation missing for key: ${path}`);
      return path;
    }
    result = result[key];
  }
  
  return result[language] || path;
};