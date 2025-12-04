import React, { useState, useContext } from 'react';
import CarritoCompras from './carrito.jsx';
import { Container, Button, Modal } from 'react-bootstrap';
import { CarritoContext } from '../context/CarritoContext';
import { useAuthContext } from '../Context/AuthContext';

function Compras() {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const { usuario } = useAuthContext();
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleFinalizarCompra = () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    setMostrarModal(true);
  };

  const confirmarCompra = () => {
    vaciarCarrito();
    setMostrarModal(false);
  };

  const total = carrito.reduce((sum, item) => sum + (Number(item.price) * item.cantidad), 0);

  return (
    <Container className="my-5">
      <h1>Mis Compras</h1>
      <p className="text-muted">Usuario: {usuario?.nombre}</p>
      
      <CarritoCompras />
      
      {carrito.length > 0 && (
        <div className="mt-4 d-flex justify-content-end">
          <Button 
            variant="success" 
            size="lg"
            onClick={handleFinalizarCompra}
            style={{ minWidth: '200px' }}
          >
            Finalizar Compra
          </Button>
        </div>
      )}

      
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🎉 ¡Compra Exitosa!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="mb-3">
              <svg 
                className="text-success" 
                width="80" 
                height="80" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h4>¡Gracias por tu compra, {usuario?.nombre}!</h4>
            <p className="text-muted mb-3">Tu pedido ha sido procesado exitosamente</p>
            <div className="bg-light p-3 rounded">
              <p className="mb-1"><strong>Total pagado:</strong></p>
              <h3 className="text-success mb-0">${total.toFixed(2)}</h3>
            </div>
            <p className="text-muted mt-3 small">
              Recibirás un email de confirmación en breve
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={confirmarCompra} className="w-100">
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Compras;