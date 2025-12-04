import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { CarritoProvider } from './Context/CarritoContext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'  
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductosProvider } from './Context/ProductosContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     
      <AuthProvider>  
        <ProductosProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
        </ProductosProvider>
      </AuthProvider>      
    </BrowserRouter>
  </StrictMode>,
)