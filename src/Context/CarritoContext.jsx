import {createContext, useState } from "react";

export const CarritoContext = createContext();
export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const agregarproductos = (producto) => {
    setCarrito((prev) => {
      const productoExistente = prev.find((item) => item.id === producto.id);
      
      if (productoExistente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
    alert(`Producto ${producto.title} agregado al carrito`);
  };

  // Nueva función para incrementar cantidad
  const incrementarCantidad = (id) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  // Nueva función para decrementar cantidad
  const decrementarCantidad = (id) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  return (
    <CarritoContext.Provider value={{ 
      carrito, 
      agregarproductos, 
      vaciarCarrito, 
      eliminarProducto,
      incrementarCantidad,
      decrementarCantidad
    }}>
      {children}
    </CarritoContext.Provider>
  );
}