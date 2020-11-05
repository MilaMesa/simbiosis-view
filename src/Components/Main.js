import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Perfil from './Perfil';
import Ofertas from './Ofertas/Ofertas';
import NotFound from './NotFound';
import Dashboard from './Administracion/Dashboard';

const Main = ({ id, userName }) => (
  <div>
    <Switch>
      <Route exact path="/" render={(props) => <Home {...props} id={id} userName={userName} />} />
      <Route path="/perfil/:id/:userName" render={(props) => <Perfil {...props} id={id} userName={userName} />} />
      <Route path="/ofertas" render={(props) => <Ofertas {...props} id={id} userName={userName} />} />
      <Route path="/admin" render={(props) => <Dashboard {...props} id={id} userName={userName} />} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  </div>
);
export default Main;