import React from 'react';
import { Link } from "react-router-dom";

class Iniciar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            password: '',
            mensaje: '',
            error: false,
        }
        this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChangeUsuario(change) {
        this.setState({
            usuario: change.target.value,
        });
    }

    handleChangePassword(change) {
        this.setState({
            password: change.target.value,
        });
    }

    handleSubmit(submit) {
        submit.preventDefault();
        this.setState({ mensaje: '', error: false });
        fetch("http://localhost:8080/login/", {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(
                (data) => {
                    data.error ?
                        this.setState({
                            error: true,
                            mensaje: 'Por favor revise el usuario y la contraseña'
                        })
                        :
                        this.props.onLogged(data.numeroIdentificacion);
                        console.log({ data });
                },
                (error) => {
                    this.setState({
                        error: true,
                        mensaje: 'Ocurrio un error con el servicio de login por favor intente mas tarde'
                    })
                    console.log(error);
                }
            );
    }

    render() {
        return (
            <div>
                <h1>Iniciar Sesion</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="usuario">Usuario</label>
                    <input
                        id="usuario"
                        onChange={this.handleChangeUsuario}
                        value={this.state.usuario}
                    />
                    <br />
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        onChange={this.handleChangePassword}
                        value={this.state.password}
                    />
                    <br />
                    <button>Iniciar sesion</button>
                </form>
                {this.state.error ? <span>{this.state.mensaje}</span> : <div />}
                <div>
                    <h3>No estas registrado</h3>
                    <li><Link to="/registrate">registrate</Link></li>
                </div>
            </div>
        );
    }
}

export default Iniciar;