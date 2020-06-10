import React from "react";
import Main from "./Main";
import Header from "./Header";
import HeaderUnLogin from './HeaderUnLogin';
import Login from '../Components/Login/Login';
import { Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logged: false,
      id: null
    }
  }

  handleLogged(id) {
    this.setState({
      ...this.state,
      logged: !this.state.logged,
      id,
    });
  }

  render() {
    if (this.state.logged) {
      return (
        <div>
          <Redirect push to="/" />
          <Header onUnLogged={() => this.handleLogged(null)} id={this.state.id} />
          <Main />
        </div>
      );
    } else {
      return (
        <div>
          <Redirect push to="/" />
          <HeaderUnLogin></HeaderUnLogin>
          <Login onLogged={(id) => this.handleLogged(id)} />
        </div>
      );
    }
  }
};
export default App;