import React from 'react';
import NotFound from '../NotFound';

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            perfil: {},
            notFound: false,
            error: false,
            errors: {
                numeroIdentificacion: '',
                nombre: '',
                telefono: '',
                celular: '',
                correo: '',
                direccion: '',
                newPassword: '',
                password: '',
            },
            id: props.match.params.id,
            errorMessage: '',
            editar: false,
        }
        this.editarPerfil = this.editarPerfil.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
        fetch("http://localhost:8080/perfil/" + this.state.id)
            .then(async response => {
                const data = await response.json();
                let notFound = this.state.notFound;

                if (response.status === 404) {
                    notFound = true;
                    const refuse = (data && data.message) || response.statusText;
                    return Promise.reject(refuse);
                }

                this.setState({ perfil: data, notFound });
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString(), error: true });
                console.error('There was an error!', error);
            });

    }

    editarPerfil() {
        this.setState({ editar: true });
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
            case 'numeroIdentificacion':
                errors.numeroIdentificacion =
                    this.validarValorMaximo(value, 11) +
                    this.validarValorMinimo(value, 6) +
                    this.validarNumerico(value);
                error = errors.numeroIdentificacion.length > 0;
                break;
            case 'nombre':
                let nombres = value.split(" ");
                console.log({ nombres });
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
            state.perfil.numeroIdentificacion.length > 0 && state.errors.numeroIdentificacion === '' &&
            state.perfil.password.length > 0 && state.errors.password === '' &&
            state.perfil.newPassword.length > 0 && state.errors.newPassword === '' &&
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
        console.log({ ...this.state.perfil });
    }

    render() {
        if (this.state.errorMessage) {
            return (<div>{this.state.errorMessage}</div>);
        }
        if (this.state.notFound) {
            return (<NotFound></NotFound>);
        }
        return (
            this.state.perfil.tipoIdentificacion ?
                <div>
                    {this.state.editar ? <h1>Editar Perfil</h1> : <h1>My Perfil</h1>}
                    <form onSubmit={this.handleSubmit}>
                        <input
                            id="nombre"
                            onChange={this.handleChange}
                            value={this.state.perfil.nombre}
                            disabled={!this.state.editar}
                        />
                        <br />
                        {this.state.errors.nombre ? <div><span className='error'>{this.state.errors.nombre}</span><br /></div> : <div></div>}
                        <label htmlFor="tipoIdentificacion">{this.state.perfil.tipoIdentificacion}</label>
                        <br />
                        <input
                            id="numeroIdentificacion"
                            onChange={this.handleChange}
                            value={this.state.perfil.numeroIdentificacion}
                            disabled={!this.state.editar}
                        />
                        <br />
                        {this.state.errors.numeroIdentificacion ? <div><span className='error'>{this.state.errors.numeroIdentificacion}</span><br /></div> : <div></div>}
                        <input
                            id="telefono"
                            onChange={this.handleChange}
                            value={this.state.perfil.telefono}
                            disabled={!this.state.editar}
                        />
                        <br />
                        {this.state.errors.telefono ? <div><span className='error'>{this.state.errors.telefono}</span><br /></div> : <div></div>}
                        <input
                            id="celular"
                            onChange={this.handleChange}
                            value={this.state.perfil.celular}
                            disabled={!this.state.editar}
                        />
                        <br />
                        {this.state.errors.celular ? <div><span className='error'>{this.state.errors.celular}</span><br /></div> : <div></div>}
                        <input
                            id="correo"
                            onChange={this.handleChange}
                            value={this.state.perfil.correo}
                            disabled={!this.state.editar}
                        />
                        <br />
                        {this.state.errors.correo ? <div><span className='error'>{this.state.errors.correo}</span><br /></div> : <div></div>}
                        <input
                            id="direccion"
                            onChange={this.handleChange}
                            value={this.state.perfil.direccion}
                            disabled={!this.state.editar}
                        />
                        <br />
                        {this.state.errors.direccion ? <div><span className='error'>{this.state.errors.direccion}</span><br /></div> : <div></div>}
                        {this.state.editar ?
                            <div>
                                <label htmlFor="newPassword">Contraseña nueva</label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    onChange={this.handleChange}
                                    value={this.state.perfil.newPassword}
                                />
                                <br />
                                {this.state.errors.newPassword ? <div><span className='error'>{this.state.errors.newPassword}</span><br /></div> : <div></div>}
                                <label htmlFor="password">Contraseña actual</label>
                                <input
                                    id="password"
                                    type="password"
                                    onChange={this.handleChange}
                                    value={this.state.perfil.password}
                                />
                                <br />
                                {this.state.errors.password ? <div><span className='error'>{this.state.errors.password}</span><br /></div> : <div></div>}
                                <button disabled={!this.state.error}>Actualizar</button>
                            </div>
                            :
                            <div></div>
                        }
                    </form>
                    {this.state.editar ? <div /> : <button onClick={this.editarPerfil}>Editar</button>}
                </div> :
                <div>... Cargando</div>
        );
    }
};


export default Perfil;