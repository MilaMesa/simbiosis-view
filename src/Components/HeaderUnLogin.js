import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => (
  <div>
    <nav>
      <ul>
        <li><Link to='/'>Iniciar sesion</Link></li>
        <li><Link to='/registrate'>Registrate</Link></li>
        <li><Link to="/about">Acerca de la aplicación</Link></li>
      </ul>
    </nav>
  </div>
);

export default Header;