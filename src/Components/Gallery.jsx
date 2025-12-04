import React, { useContext } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { CarritoContext } from '../Context/CarritoContext';
import { useProductosContext } from '../Context/ProductosContext';

function Productos() { 
    const { agregarproductos } = useContext(CarritoContext);
    const { productos, cargando, error } = useProductosContext();

    if (cargando) return <div>Cargando productos...</div>;
    if (error) return <div className="error">{error}</div>;
    
    return ( 
        <ul id="listaProductos"> 
            {productos.map(producto => (
                <li id="liProducto" key={producto.id}>                    
                    <img 
                        src={producto.image} 
                        alt={producto.title} 
                        style={{ width: "100px", height: "100px", objectFit: "contain" }} 
                    /> 
                    <br />
                    <strong>Producto:</strong> {producto.title}
                    <br />
                    <strong>Precio:</strong> ${producto.price?.toFixed(2) || producto.precio}  
                    <br />
                    <button 
                        id="btproducto" 
                        onClick={() => agregarproductos(producto)}
                    >
                        Agregar
                    </button>
                    <Link to={`/Productos/${producto.id}`}>
                        <button id="btproducto">
                            Detalles
                        </button>
                    </Link>
                </li>
            ))}  
        </ul> 
    ); 
} 

export default Productos;