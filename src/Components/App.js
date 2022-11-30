import React from "react";
import Main from "./Main";
import Header from "./Header";
import HeaderUnLogin from './HeaderUnLogin';
import Login from '../Components/Login/Login';
import { Redirect } from 'react-router-dom';
import { loginSimbiosisAppId, loginSimbiosisAppToken, loginSimbiosisAppUser,  } from "../constants";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logged: false,
      id: null,
      userName: null,
      token: null,
    }
  }

  handleLogged(id, userName, token) {
    this.setState({
      ...this.state,
      logged: !this.state.logged,
      id,
      userName,
      token,
    });
    window.localStorage.setItem(loginSimbiosisAppToken, token);
    window.localStorage.setItem(loginSimbiosisAppId, id);
    window.localStorage.setItem(loginSimbiosisAppUser, userName);
  }

  render() {
    if (this.state.logged) {
      return (
        <div>
          <Redirect push to="/" />
          <Header onUnLogged={() => this.handleLogged(null, null)} id={this.state.id} userName={this.state.userName} />
          <Main userName={this.state.userName} id={this.state.id} />
        </div>
      );
    } else {
      return (
        <div>
          <Redirect push to="/" />
          <HeaderUnLogin></HeaderUnLogin>
          <Login onLogged={(id, userName, token) => this.handleLogged(id, userName, token)} />
        </div>
      );
    }
  }
};
export default App;