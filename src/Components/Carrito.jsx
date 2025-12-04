import { useContext } from "react";
import { CarritoContext } from "../Context/CarritoContext";
import TrashIcon from "../assets/TrashIcon";
import BagIcon from "../assets/BagIcon";



const Carrito = () => {
  const { carrito, eliminarDelCarrito, actualizarCantidad } = useContext(CarritoContext);
  
  // Calcular subtotal
  const subtotal = carrito.reduce((acc, producto) => {
    const cantidad = producto.cantidad || 1;
    return acc + (producto.precio * cantidad);
  }, 0);
  
  const envio = 0;
  // Total
  const total = subtotal + envio;
  
  const handleCantidad = (indice, operacion) => {
    const producto = carrito[indice];
    const cantidadActual = producto.cantidad || 1;
    
    if (operacion === 'incrementar') {
      actualizarCantidad(indice, cantidadActual + 1);
    } else if (operacion === 'decrementar') {
      if (cantidadActual === 1) {
        eliminarDelCarrito(indice);
      } else {
        actualizarCantidad(indice, cantidadActual - 1);
      }
    }
  };
  
  if (carrito.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">¡Agregá productos para comenzar tu compra!</p>
          <a href="/" className="inline-block bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-[#333] transition-colors duration-200">
            Ir a comprar
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda - Lista de Productos */}
        <div className="lg:col-span-2 space-y-4">
          {carrito.map((producto, indice) => {
            const cantidad = producto.cantidad || 1;
            const precioTotal = producto.precio * cantidad;
            
            return (
              <div 
                key={indice} 
                className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Imagen del Producto */}
                  <div className="flex shrink-0">
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre}
                      className="w-full sm:w-32 sm:h-32 object-cover rounded-md"
                    />
                  </div>
                  
                  {/* Informacion del Producto */}
                  <div className="flex grow flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {producto.nombre}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {producto.descripcion || "Producto de alta calidad"}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Controles de Cantidad */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">Cantidad:</span>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => handleCantidad(indice, 'decrementar')}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-150 font-semibold"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 font-medium text-gray-900 min-w-[40px] text-center">
                            {cantidad}
                          </span>
                          <button 
                            onClick={() => handleCantidad(indice, 'incrementar')}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors duration-150 font-semibold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      {/* Precio */}
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ${precioTotal.toLocaleString('es-AR')}
                          </p>
                          {cantidad > 1 && (
                            <p className="text-xs text-gray-500">
                              ${producto.precio.toLocaleString('es-AR')} c/u
                            </p>
                          )}
                        </div>
                        
                        {/* Boton de Eliminar */}
                        <button 
                          onClick={() => eliminarDelCarrito(indice)}
                          className="p-2 hover:bg-red-50 rounded-md transition-colors duration-150"
                          aria-label="Eliminar producto"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Columna Derecha - Resumen del Pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toLocaleString('es-AR')}</span>
              </div>
              
              <div className="flex justify-between text-gray-700">
                <span>Envío</span>
                <span className="font-medium">
                  {envio === 0 ? (
                    <span className="text-green-600">¡Gratis!</span>
                  ) : (
                    `$${envio.toLocaleString('es-AR')}`
                  )}
                </span>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${total.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-black text-white py-3 px-4 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200 mb-3">
              Proceder al Pago
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
 <CarritoCompras carrito={Carrito} setCarrito={setCarrito} />