import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';
import { Container, Alert } from 'react-bootstrap';

function RutaProtegida({ children }) {
  const { usuario } = useAuthContext();

  if (!usuario) {
    // Guardar la ruta a la que intentaba acceder
    localStorage.setItem('rutaPrevia', window.location.pathname);
    
    return <Navigate to="/ingresar" replace />;
  }

  return children;
}

export default RutaProtegida;