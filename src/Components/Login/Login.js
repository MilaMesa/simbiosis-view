import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CrearCuenta from '../Register/CrearCuenta';
import NotFound from '../NotFound';
import Iniciar from './Iniciar';
import About from '../About';

const Login = (props) => (
    <div>
        <Switch>
            <Route exact path="/" render={() => <Iniciar {...props} />} />
            <Route path="/registrate" render={() => <CrearCuenta {...props} />} />
            <Route path="/about" component={About} />
            <Route component={NotFound} />
        </Switch>
    </div>
);

export default Login;