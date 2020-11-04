import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => (
  <div>
    <nav>
      <ul className='nav justify-content-center'>
        <img className='nav-item' src={window.location.origin + '/ImagenesD/LogoFinal.png'} alt={'Logo'} width={'120px'} height={'50px'} ></img>
        <li className='nav-item'><Link className='nav-link' to='/'>Iniciar sesion</Link></li>
        <li className='nav-item'><Link className='nav-link' to='/registrate'>Registrate</Link></li>
        <li className='nav-item'><Link className='nav-link' to="/about">Acerca de la aplicación</Link></li>
      </ul>
    </nav>
  </div>
);

export default Header;