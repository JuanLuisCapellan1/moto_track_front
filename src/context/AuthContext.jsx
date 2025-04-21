import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { findUserByCredentials, findUserById } from '../data/users';
import axios from 'axios';


// Create auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  async function fetchUser() {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/profileToken`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success === false) {
        logout(); // Limpiar estado si el token no es válido
      } else {
        setCurrentUser(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      logout(); // Limpiar estado en caso de error
    } finally {
      setLoading(false);
    }
  }

  // Check for existing user session on app load
  useEffect(() => {
    fetchUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/api/login`, 
        { correo: email,
          contrasena: password 
        });
      
      const user = response.data.data.user;
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      
      // Redirect based on user role
      if (user.role === 'administrador') {
        setCurrentUser(user);
        navigate('/panel/admin');
      } else if (user.role === 'empleado') {
        setCurrentUser(user);
        navigate('/panel/empleado');
      } else if (user.role === 'ciudadano') {
        setCurrentUser(user);
        navigate('/panel/ciudadano');
      }

      return user;
    } catch (error) {
      const er = error.response ? error.response.data : 'Error logging in';
      console.error('Login error:', error);
      return er;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setCurrentUser(null);
    navigate('/login');
  };

  const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };

  const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
  };

  const value = {
    fetchUser,
    currentUser,
    login,
    logout,
    loading,
    isAuthenticated: !!currentUser, // Remove the !loading condition
    getAccessToken,
    getRefreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;