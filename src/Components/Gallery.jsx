import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import CarritoCompras from '../Paginas/carrito.jsx';

function Productos() { 
    const [productos, setProductos] = useState([]); 
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [Carrito, setCarrito] = useState([]);
 
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

    const agregarproductos = (producto) => {
        setCarrito([...Carrito, producto]);
        alert(`Producto ${producto.title} agregado al carrito`);
     }

     if (cargando) return 'Cargando productos...';
     if (error) return error;
    

 
    return ( 
        <>
        <ul id = "listaProductos"> 
             {productos.map(producto =>(
                <li id = "liProducto" key={producto.id}>                    
                    <img src={producto.image} alt={producto.title} style={ { width: "100px", height: "100px" } } /> 
                    <br />
                    Producto: {producto.title}
                    <br />
                    Precio: $ {producto.price}  
                    <br />
                      <button id="btproducto" onClick={() => agregarproductos(producto)}>Agregar</button>
                                           
                      <button id="btproducto"> <Link to={`/Productos/${producto.id}`} >Detalles</Link></button>

                </li>
            ))}  
        </ul> 
          <CarritoCompras carrito={Carrito} setCarrito={setCarrito} />
        </>
); 
} 
export default Productos; 