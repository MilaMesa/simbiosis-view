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
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route path="/perfil/:id/:userName" render={(props) => <Perfil {...props} />} />
      <Route path="/ofertas" render={(props) => <Ofertas {...props} />} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  </div>
);
export default Main;