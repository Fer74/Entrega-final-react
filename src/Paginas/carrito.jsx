import React from 'react';

export default function CarritoCompras({ carrito, setCarrito }) {
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const total = carrito.reduce((sum, item) => sum + Number(item.price), 0);
  
 const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };
 
  return (
    <div>
      <hr />
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {carrito.map((item) => (
            <div id="Compras" key={item.id}>
                {item.title} - ${Number(item.price).toFixed(3)} <a id="Eliminar" href = "#" onClick={() => eliminarProducto(item.id)}>Eliminar</a>
               
            </div>
          ))}

          <div>
            <hr />
            Total: ${Number(total).toFixed(3)}
          </div>

          <button id="btVaciar" onClick={vaciarCarrito}>
            Vaciar Carrito
          </button>
        </>
      )}
    
    </div>
  );
}
