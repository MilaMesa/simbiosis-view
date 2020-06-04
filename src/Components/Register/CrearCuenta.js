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
            errors: {
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
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateChange = this.validateChange.bind(this);

    }

    handleChange(change) {
        this.validateChange(change.target);
        this.setState({
            [change.target.id]: change.target.value,
        });
    }

    validateChange({ id, value }) {
        let errors = this.state.errors;
        const validEmailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        switch (id) {
            case 'usuario':
                errors.usuario = this.validarValorMaximo(id, value, 15);
                break;
            case 'numeroIdentificacion':
                errors.numeroIdentificacion = this.validarValorMaximo(id,value, 11)
                break;
            case 'nombre':
                errors.nombre = this.validarValorMaximo(id, value, 11);
                errors.nombre = this.validateText(id, value);
                break;
            case 'correo':
                errors.correo =
                    validEmailRegex.test(value)
                        ? ''
                        : 'El correo no es valido';
                break;
            case 'password':
                errors.password = this.validarValorMaximo(id, value, 11)
                break;
            default:
                break;
        }

        this.setState({ errors, [id]: value }, () => {
            console.log(errors)
        })


    }

    validateText(name, value) {
        const textoRegex = RegExp(/^[A-Z]+$/i);
        return textoRegex.test(value) ? '' : 'El campo ' + name + ' debe contener solo letras.';
    }

    validarValorMaximo(name, value, maximo) {
        return value.length < maximo ? '' : 'El campo ' + name + ' no debe superar los ' + maximo + ' caracteres';
    }


    handleSubmit(submit) {
        submit.preventDefault();

    }

    render() {
        return (
            <div>
                <h1>Crear Cuenta</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="tipoIdentificacion">Tipo Identificacion</label>
                    <select
                        id="tipoIdentificacion"
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
                        value={this.state.numeroIdentificacion}
                    />
                    <br />
                    {this.state.errors.numeroIdentificacion ? <div><span className='error'>{this.state.errors.numeroIdentificacion}</span><br /></div> : <div></div>}
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        id="nombre"
                        onChange={this.handleChange}
                        value={this.state.nombre}
                    />
                    <br />
                    {this.state.errors.nombre ? <div><span className='error'>{this.state.errors.nombre}</span><br /></div> : <div></div>}
                    <label htmlFor="apellido">Apellido</label>
                    <input
                        id="apellido"
                        onChange={this.handleChange}
                        value={this.state.apellido}
                    />
                    <br />
                    {this.state.errors.apellido ? <div> <span className='error'>{this.state.errors.apellido}</span><br /></div> : <div></div>}
                    <label htmlFor="telefono">Telefono fijo</label>
                    <input
                        id="telefono"
                        onChange={this.handleChange}
                        value={this.state.telefono}
                    />
                    <br />
                    {this.state.errors.telefono ? <div><span className='error'>{this.state.errors.telefono}</span><br /></div> : <div></div>}
                    <label htmlFor="celular">Celular</label>
                    <input
                        id="celular"
                        onChange={this.handleChange}
                        value={this.state.celular}
                    />
                    <br />
                    {this.state.errors.celular ? <div><span className='error'>{this.state.errors.celular}</span><br /></div> : <div></div>}
                    <label htmlFor="correo">Correo</label>
                    <input
                        id="correo"
                        onChange={this.handleChange}
                        value={this.state.correo}
                    />
                    <br />
                    {this.state.errors.correo ? <div><span className='error'>{this.state.errors.correo}</span><br /></div> : <div></div>}
                    <label htmlFor="direccion">Direccion</label>
                    <input
                        id="direccion"
                        onChange={this.handleChange}
                        value={this.state.direccion}
                    />
                    <br />
                    {this.state.errors.direccion ? <div><span className='error'>{this.state.errors.direccion}</span><br /></div> : <div></div>}
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
                                    onChange={this.handleChange}
                                    value={this.state.nombreEmpresa}
                                />
                                <br />
                                {this.state.errors.nombreEmpresa ? <div><span className='error'>{this.state.errors.nombreEmpresa}</span><br /></div> : <div></div>}
                            </div>
                            :
                            <div />
                    }
                    <label htmlFor="usuario">usuario</label>
                    <input
                        id="usuario"
                        onChange={this.handleChange}
                        value={this.state.usuario}
                    />
                    <br />
                    {this.state.errors.usuario ? <div><span className='error'>{this.state.errors.usuario}</span><br /></div> : <div></div>}
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    <br />
                    {this.state.errors.password ? <div><span className='error'>{this.state.errors.password}</span><br /></div> : <div></div>}
                    <button>Registrarse</button>
                </form>

                <li><Link to="/">Inicia sesion</Link></li>
            </div>
        );
    }
};

export default CrearCuenta;