import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BuscarOfertas from './BuscarOfertas';
import Oferta from './Oferta';


const Perfiles = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}`} component={BuscarOfertas} />
    <Route path={`${match.url}/:id`} component={Oferta} />
  </Switch>
);

export default Perfiles;