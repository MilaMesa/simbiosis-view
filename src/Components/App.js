import React from "react";
import Main from "./Main";
import Header from "./Header";
import HeaderUnLogin from './HeaderUnLogin';
import Login from '../Components/Login/Login';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      logged: false,
    }
  }

  handleLogged() {
    this.setState({
      ...this.state,
      logged: !this.state.logged,
    });
  }

  render() {
    if (this.state.logged) {
      return (
        <div>
          <Header onUnLogged={() => this.handleLogged()} />
          <Main />
        </div>
      );
    } else {
      return (
        <div>
          <HeaderUnLogin></HeaderUnLogin>
          <Login onLogged={() => this.handleLogged()} />
        </div>
      );
    }
  }
};
export default App;