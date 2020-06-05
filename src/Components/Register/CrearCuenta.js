import React from 'react';
import { Link } from "react-router-dom";

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
            error: true,
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
    }

    handleChange(change) {
        const campo = change.target.id;
        const value = change.target.value;
        this.validateChange(campo, value);
    }

    validateChange(campo, value) {
        let errors = this.state.errors;
        let error = this.validarCamposObligatorios();
        switch (campo) {
            case 'usuario':
                errors.usuario = this.validarValorMaximo(campo, value, 15) + this.validarVacio(campo, value);
                error = errors.usuario.length > 0;
                break;
            case 'numeroIdentificacion':
                errors.numeroIdentificacion =
                    this.validarValorMaximo(campo, value, 11) +
                    this.validarValorMinimo(campo, value, 6) +
                    this.validarNumerico(campo, value);
                error = errors.numeroIdentificacion.length > 0;
                break;
            case 'nombre':
                errors.nombre = this.validarValorMaximo(campo, value, 40) + this.validateText(campo, value) + this.validarVacio(campo, value);
                error = errors.nombre.length > 0;
                break;
            case 'apellido':
                errors.apellido = this.validarValorMaximo(campo, value, 40) + this.validateText(campo, value) + this.validarVacio(campo, value);
                error = errors.apellido.length > 0;
                break;
            case 'telefono':
                errors.telefono = this.validarValorMaximo(campo, value, 8) + this.validarNumerico(campo, value) + this.validarVacio(campo, value);
                error = errors.telefono.length > 0;
                break;
            case 'celular':
                errors.celular = this.validarValorMaximo(campo, value, 11) + this.validarNumerico(campo, value) + this.validarVacio(campo, value);
                error = errors.celular.length > 0;
                break;
            case 'correo':
                errors.correo = this.validarCorreo(campo, value) + this.validarValorMaximo(campo, value, 30);
                error = errors.correo.length > 0;
                break;
            case 'direccion':
                errors.direccion = this.validarDireccion(campo, value) + this.validarValorMaximo(campo, value, 50) + this.validarVacio(campo, value);
                error = errors.direccion.length > 0;
                break;
            case 'nombreEmpresa':
                errors.nombreEmpresa = this.validateText(campo, value) + this.validarValorMaximo(campo, value, 25) + this.validarVacio(campo, value);
                error = errors.nombreEmpresa.length > 0;
                break;
            case 'password':
                errors.password = this.validarValorMaximo(campo, value, 30)
                error = errors.password.length > 0;
                break;
            default:
                break;
        }

        this.setState({ errors, [campo]: value, error }, () => {
            console.log(errors)
        })


    }

    validarCamposObligatorios() {
        const state = this.state;
        if (state.nombre.length > 0 &&
            state.numeroIdentificacion.length > 0 &&
            state.password.length > 0 &&
            state.usuario.length > 0 &&
            state.nombre.length > 0 &&
            state.celular.length > 0 &&
            state.correo.length > 0 &&
            state.apellido.length > 0 &&
            (state.tipoUsuario == 'PROVEEDOR' && state.nombreEmpresa.length > 0)
        ) {
            return true;
        }
        return false;
    }

    validateText(name, value) {
        const textoRegex = RegExp(/^[A-Z]+$/i);
        return textoRegex.test(value) ? '' : 'El campo ' + name + ' debe contener solo letras.\n';
    }

    validarNumerico(name, value) {
        const textoRegex = RegExp(/^\d+$/i);
        return textoRegex.test(value) ? '' : 'El campo ' + name + ' debe contener solo numeros.\n';
    }

    validarValorMaximo(name, value, maximo) {
        return value.length < maximo ? '' : 'El campo ' + name + ' no debe superar los ' + maximo + ' caracteres.\n';
    }

    validarValorMinimo(name, value, minimo) {
        return value.length > minimo ? '' : 'El campo ' + name + ' debe superar los ' + minimo + ' caracteres.\n';
    }

    validarVacio(name, value) {
        return value.length > 0 ? '' : 'El campo ' + name + 'no debe estar vacio.\n';
    }

    validarCorreo(name, value) {
        const validEmailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        return validEmailRegex.test(value)
            ? ''
            : 'El campo ' + name + ' no es valido';
    }

    validarDireccion(name, value) {
        const validDirRegex = RegExp('^(cll|crr|calle|carrera|carretera|circular|circunvalar|avenida|transversal)\\ \\d{1,3}\\ ?(\\w|\\W){1,3}?\\ ?(norte|sur|este|oeste|oriente|occidente)?\\ ?(#\\ ?\\d{1,3})\\ ?(\\w|\\W){1,3}?\\ ?(norte|sur|este|oeste|oriente|occidente)?\\ ?(-\\ ?\\d{1,3})$');
        return validDirRegex.test(value) ? '' : 'El campo ' + name + ' no es una direccion valida.'
    }

    handleSubmit(submit) {
        submit.preventDefault();
        console.log({ ...this.state });
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
                    <button disabled={this.state.error}>Registrarse</button>
                </form>

                <li><Link to="/">Inicia sesion</Link></li>
            </div>
        );
    }
};

export default CrearCuenta;