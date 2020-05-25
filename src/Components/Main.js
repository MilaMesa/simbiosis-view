import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Perfiles from './Perfiles/Perfiles';
import NotFound from './NotFound';

const Main = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/perfiles" component={Perfiles} />
      <Route path="/about" component={About} />
      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);
export default Main;