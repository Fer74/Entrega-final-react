import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { CarritoContext } from '../Context/CarritoContext';

function Productos() { 
    const [productos, setProductos] = useState([]); 
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    
    // Obtener la función agregarproductos del contexto
    const { agregarproductos } = useContext(CarritoContext);
 
    useEffect(() => { 
        fetch('https://fakestoreapi.com/products') 
            .then((respuesta) => respuesta.json()) 
            .then((datos) => {
                setProductos(datos);
                setCargando(false);
            }) 
            .catch((error) => {
                console.error('Error:', error);
                setError("Hubo un error al cargar los productos");
                setCargando(false);
            });
    }, []); 

    if (cargando) return 'Cargando productos...';
    if (error) return error;
    
    return ( 
        <>
        <ul id="listaProductos"> 
             {productos.map(producto => (
                <li id="liProducto" key={producto.id}>                    
                    <img src={producto.image} alt={producto.title} style={{ width: "100px", height: "100px" }} /> 
                    <br />
                    Producto: {producto.title}
                    <br />
                    Precio: $ {producto.price}  
                    <br />
                    <button id="btproducto" onClick={() => agregarproductos(producto)}>
                        Agregar
                    </button>
                    <button id="btproducto">
                        <Link to={`/Productos/${producto.id}`}>Detalles</Link>
                    </button>
                </li>
            ))}  
        </ul> 
        </>
    ); 
} 

export default Productos;