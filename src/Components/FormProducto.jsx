import { useState } from "react";
import { Modal, Form, Button } from 'react-bootstrap';
import { useProductosContext } from "../Context/ProductosContext";

const FormProducto = ({ productoInicial = {}, modo = "agregar", onCerrar }) => {
  const [producto, setProducto] = useState(productoInicial);
  const { agregarProducto, editarProducto } = useProductosContext();

  const manejarChange = (evento) => {
    const { name, value } = evento.target;
    setProducto({ ...producto, [name]: value });
  };

  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    
    if (modo === "agregar") {
      const productoParaAPI = {
        title: producto.nombre,
        price: parseFloat(producto.precio),
        description: producto.descripcion,
        image: producto.imagen,
        category: producto.categoria || 'electronics'
      };
      await agregarProducto(productoParaAPI);
    } else {
      const productoParaAPI = {
        id: producto.id,
        title: producto.nombre,
        price: parseFloat(producto.precio),
        description: producto.descripcion,
        image: producto.imagen,
        category: producto.categoria
      };
      await editarProducto(productoParaAPI);
    }
    onCerrar();
  };

  return (
    <Modal show={true} onHide={onCerrar} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {modo === "agregar" ? "Agregar Producto" : "Editar Producto"}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form onSubmit={manejarSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Ingrese el nombre del producto"
              value={producto.nombre || ""}
              onChange={manejarChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              placeholder="$0.00"
              value={producto.precio || ""}
              onChange={manejarChange}
              required
              min="0"
              step="0.01"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria"
              value={producto.categoria || "electronics"}
              onChange={manejarChange}
            >
              <option value="electronics">Electrónica</option>
              <option value="clothing">Ropa</option>
              <option value="books">Libros</option>
              <option value="toys">Juguetes</option>
              <option value="home">Hogar</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL de Imagen</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={producto.imagen || ""}
              onChange={manejarChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción del Producto</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              rows={4}
              placeholder="Escriba la descripción del producto aquí"
              value={producto.descripcion || ""}
              onChange={manejarChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onCerrar}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {modo === "agregar" ? "Agregar" : "Actualizar"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default FormProducto;