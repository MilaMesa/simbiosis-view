import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => (
  <div>
    <nav>
      <ul>
        <li><Link to={`/perfiles/${props.id}/${props.userName}`}>Mi Perfil</Link></li>
        <li><Link to="/perfiles">Perfiles</Link></li>
        <li><Link to="/about">Acerca de la aplicación</Link></li>
      </ul>
      <button onClick={() => props.onUnLogged()} >Cerrar sesion</button>
    </nav>
  </div>
);

export default Header;