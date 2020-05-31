import React from 'react';
import { Link } from "react-router-dom";
import { render } from '@testing-library/react';

class CrearCuenta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            password: '',
            numeroIdentificacion: '',
            tipoIdentificacion: '',
            nombre: '',
            apellido: '',
            telefono: '',
            celular: '',
            direccion: '',
            nombreEmpresa: '',
            tipoUsuario: '',
            correo: '',
            mensajeError: '',
            error: false,
        }
    }

    render() {
        return (
            <div>
                <h1>Crear Cuenta</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="tipoIdentificacion">Tipo Identificacion</label>
                    <select
                        id="tipoIdentificacion"
                        onChange={this.handleChangeUsuario}
                        value={this.state.tipoIdentificacion}
                    >
                        <option value='CC'>Cedula de ciudadania</option>
                        <option value='CE'>Cedula de extrangeria</option>
                        <option value='TI'>Tarjeta de identidad</option>
                        <option value='PAS'>Pasaporte</option>
                        <option value='PEP'>Permiso especial de permanencia</option>
                    </select>
                    <br />
                    <label htmlFor="numeroIdentificacion">Numero Identificacion</label>
                    <input
                        id="numeroIdentificacion"
                        onChange={this.handleChangeUsuario}
                        value={this.state.numeroIdentificacion}
                    />
                    <br />
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        id="nombre"
                        onChange={this.handleChangeUsuario}
                        value={this.state.nombre}
                    />
                    <br />
                    <label htmlFor="apellido">Apellido</label>
                    <input
                        id="apellido"
                        onChange={this.handleChangeUsuario}
                        value={this.state.apellido}
                    />
                    <br />
                    <label htmlFor="telefono">Telefono fijo</label>
                    <input
                        id="telefono"
                        onChange={this.handleChangeUsuario}
                        value={this.state.telefono}
                    />
                    <br />
                    <label htmlFor="celular">Celular</label>
                    <input
                        id="celular"
                        onChange={this.handleChangeUsuario}
                        value={this.state.celular}
                    />
                    <br />
                    <label htmlFor="correo">Correo</label>
                    <input
                        id="correo"
                        onChange={this.handleChangeUsuario}
                        value={this.state.correo}
                    />
                    <br />
                    <label htmlFor="direccion">Direccion</label>
                    <input
                        id="direccion"
                        onChange={this.handleChangeUsuario}
                        value={this.state.direccion}
                    />
                    <br />
                    <label htmlFor="tipoUsuario">Tipo Usuario</label>
                    <select 
                    id='tipoUsuario'
                    onChange={this.handleChange}
                    value={this.state.tipoUsuario}>
                        <option value='TALLER'>Taller</option>
                        <option value='PROVEEDOR'>Proveedor</option>
                    </select>
                    {
                        this.state.tipoUsuario === 'PROVEEDOR' ?
                            <div>
                                <label htmlFor="nombreEmpresa">nombreEmpresa</label>
                                <input
                                    id="nombreEmpresa"
                                    onChange={this.handleChangeUsuario}
                                    value={this.state.nombreEmpresa}
                                />
                                <br />
                            </div>
                            :
                            <div />
                    }
                    <label htmlFor="usuario">usuario</label>
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
                    <button>Registrarse</button>
                </form>

                <li><Link to="/">Inicia sesion</Link></li>
            </div>
        );
    }
};

export default CrearCuenta;