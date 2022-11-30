import React from 'react';
import '../ConjuntoCss/Register.css'

class CrearCuenta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            password: '',
            numeroIdentificacion: '',
            tipoIdentificacion: 'CC',
            nombre: '',
            apellido: '',
            telefono: '',
            celular: '',
            direccion: '',
            nombreEmpresa: '',
            tipoUsuario: 'TALLER',
            correo: '',
            mensaje: '',
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
        let error = this.state.error;
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
                errors.telefono = this.validarValorMaximo(campo, value, 7) + this.validarNumerico(campo, value);
                error = errors.telefono.length > 0;
                break;
            case 'celular':
                errors.celular = this.validarValorMaximo(campo, value, 10) + this.validarNumerico(campo, value) + this.validarValorMinimo(campo, value, 9);
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
                errors.password = this.validarValorMaximo(campo, value, 30) + this.validarValorMinimo(campo, value, 8);
                error = errors.password.length > 0;
                break;
            default:
                break;
        }
        error = error || this.validarCamposObligatorios();
        this.setState({ errors, [campo]: value, error });
    }

    validarCamposObligatorios() {
        const state = this.state;
        if (state.nombre.length > 0 && state.errors.nombre === '' &&
            state.numeroIdentificacion.length > 0 && state.errors.numeroIdentificacion === '' &&
            state.password.length > 0 && state.errors.password === '' &&
            state.usuario.length > 0 && state.errors.usuario === '' &&
            state.celular.length > 0 && state.errors.celular === '' &&
            state.correo.length > 0 && state.errors.correo === '' &&
            state.apellido.length > 0 && state.errors.apellido === '' &&
            ((state.tipoUsuario === 'PROVEEDOR' && state.nombreEmpresa.length > 0 && state.errors.nombreEmpresa === '')
                || state.tipoUsuario === 'TALLER'
                || state.tipoUsuario === 'ADMINISTRADOR')
        ) {
            return false;
        } else {
            return true;
        }
    }

    validateText(name, value) {
        const textoRegex = RegExp(/^[A-Z]+$/i);
        return textoRegex.test(value) ? '' : 'El campo ' + name + ' debe contener solo letras.\n';
    }

    validarNumerico(name, value) {
        const textoRegex = RegExp(/^\d+$/i);
        if (value.length > 0) {
            return textoRegex.test(value) ? '' : ' El campo ' + name + ' debe contener solo numeros.\n';
        }
        else {
            return '';
        }
    }

    validarValorMaximo(name, value, maximo) {
        return value.length <= maximo ? '' : 'El campo ' + name + ' no debe superar los ' + maximo + ' caracteres.\n';
    }

    validarValorMinimo(name, value, minimo) {
        return value.length > minimo ? '' : 'El campo ' + name + ' debe superar los ' + minimo + ' caracteres.\n';
    }

    validarVacio(name, value) {
        return value.length > 0 ? '' : 'El campo ' + name + ' no debe estar vacio.\n';
    }

    validarCorreo(name, value) {
        const validEmailRegex = RegExp(/^(([^<>()[\],;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\\.,;:\s@"]{2,})$/i);
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
        fetch("http://localhost:8080/cuenta/crear", {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then((data) => {
                console.log({ data });
                let errors = this.state.errors;
                let mensaje = this.state.mensaje;
                if (!data.error) {
                    this.props.onLogged(data.numeroIdentificacion, this.state.usuario);
                    console.log({ data });
                } else if (data.status === 409) {
                    errors.usuario = 'El usuario ya existe, por favor cambielo por uno nuevo';
                } else if (data.status === 424) {
                    errors.numeroIdentificacion = 'El documento ya existe, por favor reviselo';
                    errors.correo = 'El correo ya existe, por favor reviselo y cambielo por uno nuevo';
                } else if (data.status === 400) {
                    mensaje = 'La informacion ingresada esta incompleta por favor validela.'
                }
                this.setState({
                    error: data.error,
                    mensaje,
                    errors
                })

            },
                (error) => {
                    let mensaje = this.state.mensaje;
                    mensaje = 'Ocurrio un error con el servicio de login por favor intente mas tarde'
                    this.setState({
                        error: true,
                        mensaje,
                    })
                    console.log({ error });
                }
            );
    }

    render() {
        return (

                <div className="general asd">
                    <div>
                        <center>
                    <h2>Crear Cuenta</h2>
                    </center>
                        <div className='col'>
                            <form onSubmit={this.handleSubmit} className='form-group'>

                                <div>
                                    <label className="laders" htmlFor="tipoIdentificacion">Tipo Identificación</label>

                                    <select className="Seleccion"

                                        id="tipoIdentificacion"
                                        onChange={this.handleChange}
                                        value={this.state.tipoIdentificacion}
                                    >
                                        <option value='CC'>Cedula de ciudadania</option>
                                        <option value='CE'>Cedula de extrangeria</option>
                                        <option value='TI'>Tarjeta de identidad</option>
                                        <option value='PAS'>Pasaporte</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="laders" htmlFor="numeroIdentificacion">Numero Identificación</label>
                                    <input className="Seleccion"
                                        type="number"
                                        id="numeroIdentificacion"
                                        onChange={this.handleChange}
                                        value={this.state.numeroIdentificacion}
                                    />
                                    {this.state.errors.numeroIdentificacion ? <div><span className='text-danger'>{this.state.errors.numeroIdentificacion}</span><br /></div> : <div></div>}
                                </div>


                                <div>
                                    <label className="laders" htmlFor="nombre">Nombre</label>
                                    <input className="Seleccion"
                                        id="nombre"
                                        onChange={this.handleChange}
                                        value={this.state.nombre}
                                    />
                                    {this.state.errors.nombre ? <div><span className='text-danger'>{this.state.errors.nombre}</span><br /></div> : <div></div>}
                                </div>


                                <div>
                                    <label className="laders" htmlFor="apellido">Apellido</label>
                                    <input className="Seleccion"
                                        id="apellido"
                                        onChange={this.handleChange}
                                        value={this.state.apellido}
                                    />
                                    {this.state.errors.apellido ? <div> <span className='text-danger'>{this.state.errors.apellido}</span><br /></div> : <div></div>}
                                </div>

                                <div>
                                    <label className="laders" htmlFor="telefono">Teléfono fijo</label>
                                    <input className="Seleccion"
                                        type="number"
                                        id="telefono"
                                        onChange={this.handleChange}
                                        value={this.state.telefono}
                                    />
                                    {this.state.errors.telefono ? <div><span className='text-danger'>{this.state.errors.telefono}</span><br /></div> : <div></div>}
                                </div>

                                <div>
                                    <label className="laders" htmlFor="celular">Celular</label>
                                    <input className="Seleccion"
                                        type="number"
                                        id="celular"
                                        onChange={this.handleChange}
                                        value={this.state.celular}
                                    />
                                    {this.state.errors.celular ? <div><span className='text-danger'>{this.state.errors.celular}</span><br /></div> : <div></div>}
                                </div>

                                <div>
                                    <label className="laders" htmlFor="correo">Correo</label>
                                    <input className="Seleccion"
                                        type="email"
                                        id="correo"
                                        onChange={this.handleChange}
                                        value={this.state.correo}
                                    />
                                    {this.state.errors.correo ? <div><span className='text-danger'>{this.state.errors.correo}</span><br /></div> : <div></div>}
                                </div>

                                <div>
                                    <label className="laders" htmlFor="direccion">Dirección</label>
                                    <input className="Seleccion"
                                        id="direccion"
                                        onChange={this.handleChange}
                                        value={this.state.direccion}
                                    />
                                    {this.state.errors.direccion ? <div><span className='text-danger'>{this.state.errors.direccion}</span><br /></div> : <div></div>}
                                </div>

                                <div>
                                    <label className="laders" htmlFor="tipoUsuario">Tipo Usuario</label>
                                    <select className="Seleccion"
                                        id='tipoUsuario'
                                        onChange={this.handleChange}
                                        value={this.state.tipoUsuario}>
                                        <option value='TALLER'>Taller</option>
                                        <option value='PROVEEDOR'>Proveedor</option>
                                        <option value='ADMINISTRADOR'>Administrador</option>
                                    </select>
                                    {
                                        this.state.tipoUsuario === 'PROVEEDOR' ?
                                            <div>

                                                <div>
                                                    <label className="laders" htmlFor="nombreEmpresa">Nombre Empresa</label>
                                                    <input className="Seleccion"
                                                        id="nombreEmpresa"
                                                        onChange={this.handleChange}
                                                        value={this.state.nombreEmpresa}
                                                    />
                                                    <br />
                                                    {this.state.errors.nombreEmpresa ? <div><span className='text-danger'>{this.state.errors.nombreEmpresa}</span><br /></div> : <div></div>}
                                                </div>
                                            </div>
                                            :
                                            <div />
                                    }

                                    <div>
                                        <label className="laders" htmlFor="usuario">Nombre de Usuario</label>
                                        <input className="Seleccion"

                                            id="usuario"
                                            onChange={this.handleChange}
                                            value={this.state.usuario}
                                        />
                                        {this.state.errors.usuario ? <div><span className='text-danger'>{this.state.errors.usuario}</span><br /></div> : <div></div>}
                                    </div>
                                    
                                    <div>
                                        <label className="laders" htmlFor="password">Contraseña</label>
                                        <input className="Seleccion"

                                            id="password"
                                            type="password"
                                            onChange={this.handleChange}
                                            value={this.state.password}
                                        />
                                        {this.state.errors.password ? <div><span className='text-danger'>{this.state.errors.password}</span><br /></div> : <div></div>}
                                    </div>
                                </div>
                                <br />
                                <center>
                                    <button className='btn btn-primary' disabled={this.state.error}>Registrarse</button>
                                </center>

                            </form>
                            {this.state.mensaje.length > 0 ? <div><span className='text-danger'>{this.state.mensaje}</span></div> : <div />}
                        </div>

                    </div>

            </div>

        );
    }
};

export default CrearCuenta;