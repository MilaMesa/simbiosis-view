import React from 'react';
import { Link } from "react-router-dom";
import '../ConjuntoCss/Register.css'
import { GoogleLogin } from '@react-oauth/google';

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
                        mensaje: 'Ocurrio un error con el servicio de login.'
                    })
                    console.log(error);
                }
            );
    }

    render() {
        return (
            <div className='container asd'>
                <center>
                    <h2>Iniciar Sesión</h2>
                </center>
                <div className='general'>
                    <form className='form-group' style={{ paddingTop: 25 }} onSubmit={this.handleSubmit}>
                        <div>

                            <label className="laders2" htmlFor="usuario">Usuario</label>
                            <input className="Seleccion"
                                id="usuario"
                                onChange={this.handleChangeUsuario}
                                value={this.state.usuario}
                            />
                        </div>

                        <div>

                            <label className="laders2" htmlFor="password">Contraseña</label>
                            <input className="Seleccion"
                                id="password"
                                type="password"
                                onChange={this.handleChangePassword}
                                onPaste={(e) => e.preventDefault()}
                                value={this.state.password}
                            />
                        </div>
                        <br />
                        <center>
                            <button className='btn btn-primary'>Iniciar sesión</button>

                            <div style={{ padding: 10 }}>
                                {this.state.error ? <span className='text-danger'>{this.state.mensaje}</span> : <div />}
                            </div>
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </center>
                    </form>

                </div>
                <center>
                    <div className='col'>
                        <div>
                            <span>No estas registrado?</span>
                        </div>
                        <div>
                            <li className='btn btn-link'><Link to="/registrate">Registrate!</Link></li>
                        </div>
                    </div>
                </center>
            </div>

        );
    }
}

export default Iniciar;