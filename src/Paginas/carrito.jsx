import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

export default function CarritoCompras() {
  const { carrito, vaciarCarrito, eliminarProducto, incrementarCantidad, decrementarCantidad } = useContext(CarritoContext);
  
  const total = carrito.reduce((sum, item) => sum + (Number(item.price) * item.cantidad), 0);
 
  return (
    <div>
      <hr />
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {carrito.map((item, index) => (
            <div id="Compras" key={`${item.id}-${index}`} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd' }}>
              <div>{item.title}</div>
              <div>Precio unitario: ${Number(item.price).toFixed(2)}</div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
                <button 
                  onClick={() => decrementarCantidad(item.id)}
                  style={{ padding: '5px 10px', cursor: 'pointer' }}
                  disabled={item.cantidad <= 1}
                >
                  -
                </button>
                
                <span>Cantidad: {item.cantidad}</span>
                
                <button 
                  onClick={() => incrementarCantidad(item.id)}
                  style={{ padding: '5px 10px', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>
              
              <div style={{ fontWeight: 'bold' }}>
                Subtotal: ${(Number(item.price) * item.cantidad).toFixed(2)}
              </div>
              
              <button 
                id="Eliminar" 
                onClick={() => eliminarProducto(item.id)}
                style={{ marginTop: '10px', cursor: 'pointer', backgroundColor: '#ff4444', color: 'white', padding: '5px 15px', border: 'none' }}
              >
                Eliminar
              </button>
            </div>
          ))}

          <div style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold' }}>
            <hr />
            Total: ${Number(total).toFixed(2)}
          </div>

          <button 
            id="btVaciar" 
            onClick={vaciarCarrito}
            style={{ marginTop: '15px', padding: '10px 20px', cursor: 'pointer' }}
          >
            Vaciar Carrito
          </button>
        </>
      )}
    </div>
  );
}