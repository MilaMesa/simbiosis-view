import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CrearCuenta from '../Register/CrearCuenta';
import NotFound from '../NotFound';
import Iniciar from './Iniciar';

const Login = (props) => (
    <div>
        <Switch>
            <Route exact path="/" component={Iniciar} />
            <Route path="/registrate" component={CrearCuenta} />
            <Route component={NotFound} />
        </Switch>
    </div>
);

export default Login;