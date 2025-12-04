import { useState, useEffect, createContext, useContext } from 'react';

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  const API = "https://fakestoreapi.com/products";

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError(null);
      
      const respuesta = await fetch(API);
      
      if (!respuesta.ok) 
        throw new Error(`Error HTTP: ${respuesta.status}`);
      
      const datos = await respuesta.json();
      setProductos(datos);

    } catch (error) {
      console.error("Error al cargar productos:", error);
      setError(error.message || "Error al cargar los productos");

    } finally {
      setCargando(false);
    }
  };

  const agregarProducto = async (producto) => {
    try {
      setError(null);

      const respuesta = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      
      if (!respuesta.ok) 
        throw new Error(`Error HTTP: ${respuesta.status}`);

      const nuevoProducto = await respuesta.json();
      console.log("Producto agregado: ", nuevoProducto);
      
      setProductos([...productos, nuevoProducto]);
      alert('Producto agregado correctamente');

    } catch (error) {
      console.error("Error al agregar:", error);
      setError("Hubo un problema al agregar el producto.");
    }
  };

  const editarProducto = async (producto) => {
    try {
      setError(null);

      const respuesta = await fetch(`${API}/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      if (!respuesta.ok) 
        throw new Error(`Error HTTP: ${respuesta.status}`);

      const productoActualizado = await respuesta.json();
      
      // Actualizar en el estado local
      setProductos(productos.map(p => 
        p.id === productoActualizado.id ? productoActualizado : p
      ));
      
      alert('Producto actualizado correctamente');

    } catch (error) {
      console.error("Error al editar:", error);
      setError("Hubo un problema al editar el producto.");
    }
  };

  const eliminarProducto = async (id) => {
    try {
      setError(null);

      const respuesta = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) 
        throw new Error("Error al eliminar");  

      setProductos(productos.filter(p => p.id !== id));
      alert('Producto eliminado correctamente');
      
    } catch (error) {
      console.error(error.message);
      setError("Hubo un problema al eliminar el producto.");
    }
  };

  return (
    <ProductosContext.Provider value={{ 
      productos,
      cargando,
      error, 
      cargarProductos, 
      agregarProducto, 
      editarProducto, 
      eliminarProducto 
    }}>
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductosContext = () => useContext(ProductosContext);