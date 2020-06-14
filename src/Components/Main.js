import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Perfil from './Perfil';
import Ofertas from './Ofertas/Ofertas';
import NotFound from './NotFound';

const Main = (props) => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/perfil/:id/:userName" component={Perfil} />
      <Route path="/ofertas" component={Ofertas} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  </div>
);
export default Main;