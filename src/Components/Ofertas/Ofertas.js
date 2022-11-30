import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BuscarOfertas from './BuscarOfertas';
import Oferta from './Oferta';

const Ofertas = (props) => (
  <Switch>
    <Route exact path={`${props.match.url}`} render={() => <BuscarOfertas {...props} />} />
    <Route path={`${props.match.url}/:id`} component={Oferta} />
  </Switch>
);

export default Ofertas;