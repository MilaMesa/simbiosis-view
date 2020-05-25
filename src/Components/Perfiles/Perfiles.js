import React from 'react';
import TodosLosPerfiles from './TodosLosPerfiles'
import { Switch, Route } from 'react-router-dom';
import Perfil from './Perfil';

const Perfiles = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}`} component={TodosLosPerfiles} />
    <Route path={`${match.url}/:id`} component={Perfil} />
  </Switch>
);

export default Perfiles;