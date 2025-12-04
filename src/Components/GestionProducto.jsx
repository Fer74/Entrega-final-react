import { useState } from "react";
import { Container, Button, Table, Modal } from 'react-bootstrap';
import FormProducto from "./FormProducto";
import { useProductosContext } from "../Context/ProductosContext";

const GestionProductos = () => {
  const { productos, eliminarProducto } = useProductosContext();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("agregar");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const abrirFormularioAgregar = () => {
    setModoFormulario("agregar");
    setProductoSeleccionado(null);
    setMostrarForm(true);
  };

  const abrirFormularioEditar = (producto) => {
    setModoFormulario("editar");
    // Mapear los campos de la API a los campos del formulario
    setProductoSeleccionado({
      id: producto.id,
      nombre: producto.title,
      precio: producto.price,
      imagen: producto.image,
      descripcion: producto.description
    });
    setMostrarForm(true);
  };

  const cerrarFormulario = () => {
    setMostrarForm(false);
    setProductoSeleccionado(null);
  };

  const confirmarEliminacion = (producto) => {
    setProductoAEliminar(producto);
  };

  const handleEliminar = () => {
    if (productoAEliminar) {
      eliminarProducto(productoAEliminar.id);
      setProductoAEliminar(null);
    }
  };

  return (
    <Container className="my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Productos</h2>
        <Button variant="success" onClick={abrirFormularioAgregar}>
          + Agregar Producto
        </Button>
      </div>

      {/* Lista de productos */}
      {productos.length === 0 ? (
        <div className="alert alert-info text-center">
          <p className="mb-0">Cargando productos...</p>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Título</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>
                  <img 
                    src={producto.image} 
                    alt={producto.title}
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                </td>
                <td>{producto.title}</td>
                <td>${producto.price?.toLocaleString('es-AR')}</td>
                <td>
                  <Button 
                    variant="warning" 
                    size="sm" 
                    className="me-2"
                    onClick={() => abrirFormularioEditar(producto)}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => confirmarEliminacion(producto)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal de confirmación de eliminar */}
      <Modal show={!!productoAEliminar} onHide={() => setProductoAEliminar(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            ¿Estás seguro que querés eliminar <strong>"{productoAEliminar?.title}"</strong>?
          </p>
          <small className="text-muted">Esta acción no se puede deshacer</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setProductoAEliminar(null)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal - Formulario */}
      {mostrarForm && (
        <FormProducto
          productoInicial={productoSeleccionado || {}}
          modo={modoFormulario}
          onCerrar={cerrarFormulario}
        />
      )}
    </Container>
  );
};

export default GestionProductos;