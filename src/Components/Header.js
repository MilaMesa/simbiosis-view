import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <div>
    <nav>
      <ul>
        <li><Link to="/perfiles">Perfiles</Link></li>
        <li><Link to="/about">Acerca de la aplicación</Link></li>
      </ul>
    </nav>
  </div>
);

export default Header;