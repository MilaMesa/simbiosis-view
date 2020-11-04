import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => (
  <div>
    <nav>
      <ul className='nav justify-content-center'>
        <li className='nav-item'><Link className='nav-link' to={`/perfil/${props.id}/${props.userName}`}>Mi Perfil</Link></li>
        <li className='nav-item'><Link className='nav-link' to="/ofertas">Ofertas</Link></li>
        <li className='nav-item'><Link className='nav-link' to="/admin">Administrar</Link></li>
        <li className='nav-item'><Link className='nav-link' to="/about">Acerca de la aplicación</Link></li>
        <button className='btn nav-item' onClick={() => props.onUnLogged()} >Cerrar sesion</button>
      </ul>      
    </nav>
  </div>
);

export default Header;