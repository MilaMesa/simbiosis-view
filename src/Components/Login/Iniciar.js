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
                        this.props.onLogged(data.numeroIdentificacion, this.state.usuario);
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
            <div className='container'>
                <h1>Iniciar Sesion</h1>
                <div className='col'>
                    <form className='form-group' onSubmit={this.handleSubmit}>
                        <label htmlFor="usuario">Usuario</label>
                        <input
                            className="form-control"
                            id="usuario"
                            onChange={this.handleChangeUsuario}
                            value={this.state.usuario}
                        />
                        <label htmlFor="password">Contraseña</label>
                        <input
                            className="form-control"
                            id="password"
                            type="password"
                            onChange={this.handleChangePassword}
                            onPaste={(e) => e.preventDefault()}
                            value={this.state.password}
                        />
                        <br/>
                        <button className='btn btn-primary'>Iniciar sesion</button>
                    </form>
                    {this.state.error ? <span className='text-danger'>{this.state.mensaje}</span> : <div />}
                </div>
                <div className='col'>
                    <span>No estas registrado?</span>
                    <li className='btn btn-link'><Link to="/registrate">Registrate!</Link></li>
                </div>
            </div>
        );
    }
}

export default Iniciar;