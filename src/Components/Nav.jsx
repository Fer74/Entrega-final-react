import { Link } from "react-router-dom";

export default function Nav() { 

    return (
        <nav>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/Productos">Detalle</Link></li>
                
                <li><Link to="/Contacto">Contacto</Link></li>
              
            </ul>
        </nav>
    );
}