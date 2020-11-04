import React from 'react';
import NotFound from './NotFound';
import Comentarios from './Comentarios';
import './ConjuntoCss/Register.css'

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            miPerfil: props.match.params.userName === props.userName,
            perfil: {
                usuario: props.match.params.userName,
                numeroIdentificacion: props.match.params.id,
                nombre: '',
                telefono: '',
                celular: '',
                correo: '',
                direccion: '',
                newPassword: '',
                password: '',
                tipoDeUsuario: props.match.params.tipoDeUsuario,
            },
            notFound: false,
            error: true,
            errors: {
                numeroIdentificacion: '',
                nombre: '',
                telefono: '',
                celular: '',
                correo: '',
                direccion: '',
                newPassword: '',
                password: '',
                tipoDeUsuario: '',
            },
            errorMessage: '',
            editar: false,
        }
        this.editarPerfil = this.editarPerfil.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        fetch("http://localhost:8080/perfil/" + this.state.perfil.numeroIdentificacion)
            .then(async response => {
                const data = await response.json();
                let notFound = this.state.notFound;
                let perfil = this.state.perfil;

                if (response.status === 404) {
                    notFound = true;
                    const refuse = (data && data.message) || response.statusText;
                    return Promise.reject(refuse);
                }

                perfil = { ...perfil, ...data };
                this.setState({ perfil, notFound });
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString(), error: true });
                console.error('There was an error!', error);
            });

    }

    editarPerfil() {
        const perfil = this.state.perfil;
        perfil.password = '';
        perfil.newPassword = '';
        this.setState({ editar: true, perfil });
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
            case 'nombre':
                let nombres = value.split(" ");
                errors.nombre = this.validarValorMaximo(nombres[0], 40) + this.validateText(nombres[0]) + this.validarVacio(nombres[0]);
                if (nombres.length === 2) {
                    errors.nombre = errors.nombre + this.validarValorMaximo(nombres[1], 40) + this.validateText(nombres[1]) + this.validarVacio(nombres[1]);
                }
                error = errors.nombre.length > 0;
                break;
            case 'telefono':
                errors.telefono = this.validarValorMaximo(value, 7) + this.validarNumerico(value);
                error = errors.telefono.length > 0;
                break;
            case 'celular':
                errors.celular = this.validarValorMaximo(value, 10) + this.validarNumerico(value) + this.validarValorMinimo(value, 9);
                error = errors.celular.length > 0;
                break;
            case 'correo':
                errors.correo = this.validarCorreo(value) + this.validarValorMaximo(value, 30);
                error = errors.correo.length > 0;
                break;
            case 'direccion':
                errors.direccion = this.validarDireccion(value) + this.validarValorMaximo(value, 50) + this.validarVacio(value);
                error = errors.direccion.length > 0;
                break;
            case 'newPassword':
                errors.newPassword = this.validarValorMaximo(value, 30) + this.validarValorMinimo(value, 8);
                error = errors.newPassword.length > 0;
                break;
            case 'password':
                errors.password = this.validarValorMaximo(value, 30) + this.validarValorMinimo(value, 8);
                error = errors.password.length > 0;
                break;
            default:
                break;
        }
        error = error || this.validarCamposObligatorios();
        let perfil = this.state.perfil;
        perfil = { ...perfil, [campo]: value };
        this.setState({ errors, perfil, error });
    }

    validarCamposObligatorios() {
        const state = this.state;
        if (state.perfil.nombre.length > 0 && state.errors.nombre === '' &&
            state.perfil.password.length > 0 && state.errors.password === '' &&
            state.perfil.celular.length > 0 && state.errors.celular === '' &&
            state.perfil.correo.length > 0 && state.errors.correo === ''
        ) {
            return false;
        } else {
            return true;
        }
    }

    validateText(value) {
        const textoRegex = RegExp(/^[A-Z]+$/i);
        return textoRegex.test(value) ? '' : 'El campo debe contener solo letras.\n';
    }

    validarNumerico(value) {
        const textoRegex = RegExp(/^\d+$/i);
        if (value.length > 0) {
            return textoRegex.test(value) ? '' : 'El campo debe contener solo numeros.\n';
        }
        else {
            return '';
        }
    }

    validarValorMaximo(value, maximo) {
        return value.length <= maximo ? '' : 'El campo no debe superar los ' + maximo + ' caracteres.\n';
    }

    validarValorMinimo(value, minimo) {
        return value.length > minimo ? '' : 'El campo debe superar los ' + minimo + ' caracteres.\n';
    }

    validarVacio(value) {
        return value.length > 0 ? '' : 'El campo no debe estar vacio.\n';
    }

    validarCorreo(value) {
        const validEmailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        return validEmailRegex.test(value)
            ? ''
            : 'El campo no es valido';
    }

    validarDireccion(value) {
        const validDirRegex = RegExp('^(cll|crr|calle|carrera|carretera|circular|circunvalar|avenida|transversal)\\ \\d{1,3}\\ ?(\\w|\\W){1,3}?\\ ?(norte|sur|este|oeste|oriente|occidente)?\\ ?(#\\ ?\\d{1,3})\\ ?(\\w|\\W){1,3}?\\ ?(norte|sur|este|oeste|oriente|occidente)?\\ ?(-\\ ?\\d{1,3})$');
        return validDirRegex.test(value) ? '' : 'El campo no es una direccion valida.'
    }

    handleSubmit(submit) {
        submit.preventDefault();
        fetch('http://localhost:8080/cuenta/actualizar', {
            method: 'POST',
            body: JSON.stringify(this.state.perfil),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then((data) => {
                let editar = this.state.editar;
                let errors = this.state.errors;
                let errorMessage = this.state.errorMessage;
                switch (data.status) {
                    case 400: {
                        errors.nombre = 'El nombre completo del usuario solo debe estar compuesto por 2 palabras.';
                        errorMessage = 'Error en uno o mas campos por favor valide que estan correctos.';
                        break;
                    }
                    case 417: {
                        errors.password = 'La contraseña no es correcta, no es posible actualizar los datos.';
                        break;
                    }
                    case 404: {
                        errorMessage = 'Existe un problema con el usuario por favor envienos un correo con el usuario y la informacion de la cuenta para darte una solucion.';
                        const refuse = (data && data.message) || data.statusText;
                        return Promise.reject(refuse);
                    }
                    default: {
                        editar = false;
                    }
                }
                this.setState({ editar, errors, errorMessage });
            })
            .catch((dataError) => {
                console.log(dataError);
                let errorMessage = this.state.errorMessage;
                let error = this.state.error;
                errorMessage = 'Ocurrio un error con el servicio por favor intente mas tarde.\n';
                error = true;
                this.setState({ errorMessage, error });
            });
    }

    render() {
        if (this.state.notFound) {
            return (<NotFound></NotFound>);
        }
        return (
            this.state.perfil.tipoIdentificacion ?
                <div className='container'>
                    <center>
                        <img className='Tamaño ' src='../../ImagenesD/UsuarioM.png'></img>
                    </center>
                    {this.state.miPerfil ? this.state.editar ? <h2 className='text-center'>Editar Perfil</h2> : <h2 className='text-center'>Mi Perfil</h2> : <h2>{this.state.perfil.usuario}</h2>}
                    <div className='col'>
                        <center>
                        <form className='form-group' onSubmit={this.handleSubmit}>
                            <label  htmlFor="tipoIdentificacion">{this.state.perfil.tipoIdentificacion}: </label>
                            <label htmlFor="numeroIdentificacion">{this.state.perfil.numeroIdentificacion}</label>
                            
                            <label htmlFor="TipoDeUsuario">{this.state.perfil.TipoDeUsuario}</label>
                            
                            <input
                                className='form-control2'
                                id="nombre"
                                onChange={this.handleChange}
                                value={this.state.perfil.nombre}
                                disabled={!this.state.editar}
                            />
                            {this.state.errors.nombre ? <div><span className='text-danger'>{this.state.errors.nombre}</span><br /></div> : <div></div>}
                            <input
                                className='form-control2'
                                id="telefono"
                                onChange={this.handleChange}
                                value={this.state.perfil.telefono}
                                disabled={!this.state.editar}
                            />
                            {this.state.errors.telefono ? <div><span className='text-danger'>{this.state.errors.telefono}</span><br /></div> : <div></div>}
                            <input
                                className='form-control2'
                                id="celular"
                                onChange={this.handleChange}
                                value={this.state.perfil.celular}
                                disabled={!this.state.editar}
                            />
                            {this.state.errors.celular ? <div><span className='text-danger'>{this.state.errors.celular}</span><br /></div> : <div></div>}
                            <input
                                className='form-control2'
                                id="correo"
                                onChange={this.handleChange}
                                value={this.state.perfil.correo}
                                disabled={!this.state.editar}
                            />
                            {this.state.errors.correo ? <div><span className='text-danger'>{this.state.errors.correo}</span><br /></div> : <div></div>}
                            <input
                                className='form-control2'
                                id="direccion"
                                onChange={this.handleChange}
                                value={this.state.perfil.direccion}
                                disabled={!this.state.editar}
                            />
                            {this.state.errors.direccion ? <div><span className='text-danger'>{this.state.errors.direccion}</span><br /></div> : <div></div>}
                            {this.state.editar ?
                                <div>
                                    <input
                                        className='form-control2'
                                        id="password"
                                        type="password"
                                        placeholder='Contraseña actual'
                                        onChange={this.handleChange}
                                        onPaste={(e) => e.preventDefault()}
                                        value={this.state.perfil.password}
                                    />
                                    {this.state.errors.password ? <div><span className='text-danger'>{this.state.errors.password}</span><br /></div> : <div></div>}
                                    <input
                                        className='form-control2'
                                        id="newPassword"
                                        type="password"
                                        placeholder='Contraseña nueva'
                                        onChange={this.handleChange}
                                        onPaste={(e) => e.preventDefault()}
                                        value={this.state.perfil.newPassword}
                                    />
                                    {this.state.errors.newPassword ?
                                        <div><span className='text-danger'>{this.state.errors.newPassword}</span><br /></div> :
                                        <small className='form-text text-muted'>Deje este campo vacio si no desea cambiar la contraseña</small>}
                                    <button className='btn btn-primary' disabled={this.state.error}>Actualizar</button>
                                    {this.state.errorMessage ? <div><span className='danger'>{this.state.errorMessage}</span></div> : <div />}
                                </div>
                                :
                                <div></div>
                            }
                            <br />
                            {this.state.miPerfil ? !this.state.editar ? <button type='submit' className='btn btn-primary' onClick={this.editarPerfil}>Editar</button> : <div /> : <div />}
                        </form>
                        </center>
                    </div>
                    {this.state.miPerfil ? <div /> :
                        <div>
                            <h1>Comentarios</h1>
                            <Comentarios usuario={this.state.perfil.numeroIdentificacion} usuarioCreacion={this.props.id}></Comentarios>
                        </div>
                    }
                </div> :
                <div>... Cargando</div>
        );
    }
};


export default Perfil;