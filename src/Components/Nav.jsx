import { Link, useNavigate } from "react-router-dom";
import BagIcon from '../assets/BagIcon';
import { CarritoContext } from "../Context/CarritoContext";
import { useAuthContext } from "../Context/AuthContext";
import { useContext } from "react";

export default function Nav() {   
    
    const { carrito } = useContext(CarritoContext);
    const { usuario, logout, isAdmin } = useAuthContext();
    const navigate = useNavigate();

    const contadorEnCarrito = carrito.reduce(
        (total, item) => total + (item.cantidad || 1),
        0
    );

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/Productos">Detalle</Link></li>
                
                {/* Mostrar Admin solo si es administrador */}
                {usuario && isAdmin() && (
                    <li><Link to="/admin">Administración</Link></li>
                )}
                
                {/* Mostrar Ingresar solo si NO está logueado */}
                {!usuario ? (
                    <li><Link to="/ingresar">Ingresar</Link></li>
                ) : (
                    <>
                        <li style={{ color: '#666', fontWeight: '500' }}>
                            👤 {usuario.nombre}
                        </li>
                        <li>
                            <button 
                                onClick={handleLogout}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'inherit',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    fontSize: 'inherit',
                                    padding: 0
                                }}
                            >
                                Cerrar Sesión
                            </button>
                        </li>
                    </>
                )}
                
                <li>
                    <Link to="/Compras" style={{ position: 'relative', display: 'inline-block' }}>
                        <BagIcon className="w-6 h-6" />
                        {contadorEnCarrito > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                backgroundColor: '#dc2626',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {contadorEnCarrito}
                            </span>
                        )}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}