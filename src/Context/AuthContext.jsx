import { useState, useContext, createContext } from 'react';

const USUARIOS_FAKE = [
  { 
    id: 1, 
    usuario: 'admin', 
    contrasenia: '1234', 
    rol: 'admin',
    nombre: 'Admin'
  },
  { 
    id: 2, 
    usuario: 'maria', 
    contrasenia: '1234', 
    rol: 'usuario',
    nombre: 'Maria'
  }
];

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  
  const login = (nombreUsuario, contrasenia) => {
    const usuarioLogin = USUARIOS_FAKE.find(
      u => u.usuario === nombreUsuario && u.contrasenia === contrasenia
    );

    if (usuarioLogin) {
      const token = `fake-token-${nombreUsuario}`;
      localStorage.setItem('authToken', token);
      setUsuario(usuarioLogin);
      return usuarioLogin;
    }
    return null;
  }  
                                       
  const logout = () => {
    localStorage.removeItem('authToken');
    setUsuario(null);
  };

  const isAdmin = () => {
    return usuario?.rol === 'admin';
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  ); 
}

export const useAuthContext = () => useContext(AuthContext);