import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductosContext } from "../Context/ProductosContext";

const ProductosDetalle = () => {
  const { id } = useParams();
  const { productos } = useProductosContext();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Primero buscar en el contexto (productos locales)
    const productoLocal = productos.find(p => p.id === id || p.id === parseInt(id));
    
    if (productoLocal) {
      setProducto(productoLocal);
      setCargando(false);
      return;
    }

    // Si no está en el contexto, traer de la API
    setCargando(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(respuesta => {
        if (!respuesta.ok) throw new Error("Producto no encontrado");
        return respuesta.json();
      })
      .then(dato => {
        setProducto(dato);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setError("No se encontró el producto");
        setCargando(false);
      });
  }, [id, productos]);

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div>
      <h2>Detalles del Producto Nro {id}</h2>
      <img 
        src={producto.image} 
        alt={producto.title} 
        style={{ width: "200px", height: "200px", objectFit: "contain" }} 
      />
      <br />
      <h3>{producto.title}</h3>
      <p><strong>Precio:</strong> ${producto.price?.toFixed(2) || producto.precio}</p>
      <p><strong>Descripción:</strong></p>
      <p>{producto.description || producto.descripcion}</p>
      {producto.category && <p><strong>Categoría:</strong> {producto.category}</p>}
    </div>
  );
};

export default ProductosDetalle;