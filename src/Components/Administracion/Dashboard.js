import React from 'react';
import { validarTexto, validarVacio, validarNumerico } from '../../Utils/Validaciones';
import { insumosAPI } from '../../api';
import '../ConjuntoCss/Register.css'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            insumos: [],
            crearInsumo: '',
            modalDisplay: 'none',
            insumo: {
                detalles: '',
                referenciaConfeccion: 0,
                valor: 0,
                cantidad: 0,
                forma: '',
                color: '',
                tamaño: 0,
                material: '',
                identificacionUsuario: this.props.id,
                codigo: 0,
            },
            errors: {
                detalles: '',
                referenciaConfeccion: '',
                valor: '',
                cantidad: '',
                forma: '',
                color: '',
                tamaño: '',
                material: '',
                codigo: '',
            },
            error: true,
            errorCreacion: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.crearInsumo = this.crearInsumo.bind(this);
    }

    componentDidMount() {
        insumosAPI.all().then((response) => {
            this.setState({ insumos: response });
        });
    }

    crearInsumoForm() {
        this.setState({ crearInsumo: 'show', modalDisplay: 'block' });
    }

    cerrarModal() {
        this.setState({ crearInsumo: '', modalDisplay: 'none' });
        insumosAPI.all().then((response) => {
            this.setState({ insumos: response });
        });
    }

    handleChange(change) {
        const campo = change.target.id;
        const value = change.target.value;
        this.validateChange(campo, value);
    };

    validateChange(campo, value) {
        let errors = this.state.errors;
        let error = this.state.error;
        switch (campo) {
            case 'detalles':
                errors.detalles = validarTexto(value) + validarVacio(value);
                error = 0 < errors.detalles.length
                break;
            case 'forma':
                errors.forma = validarTexto(value) + validarVacio(value);
                error = 0 < errors.forma.length
                break;
            case 'color':
                errors.color = validarTexto(value) + validarVacio(value);
                error = 0 < errors.color.length
                break;
            case 'material':
                errors.material = validarTexto(value) + validarVacio(value);
                error = 0 < errors.material.length
                break;
            case 'referenciaConfeccion':
                errors.referenciaConfeccion = validarNumerico(value) + validarVacio(value);
                error = 0 < errors.referenciaConfeccion.length
                break;
            case 'valor':
                errors.valor = validarNumerico(value) + validarVacio(value);
                error = 0 < errors.valor.length
                break;
            case 'cantidad':
                errors.cantidad = validarNumerico(value) + validarVacio(value);
                error = 0 < errors.cantidad.length
                break;
            case 'tamaño':
                errors.tamaño = validarNumerico(value) + validarVacio(value);
                error = 0 < errors.tamaño.length
                break;
            case 'codigo':
                errors.codigo = validarNumerico(value) + validarVacio(value);
                error = 0 < errors.codigo.length
                break;
            default:
                break;
        }
        error = error || this.validarCamposObligatorios();
        const insumo = this.state.insumo;
        insumo[campo] = value;
        this.setState({ errors, insumo, error });
    };

    validarCamposObligatorios() {
        const state = this.state;
        if (state.insumo.detalles.length > 0 && state.errors.detalles === ''
            && state.errors.referenciaConfeccion === ''
            && state.errors.valor === ''
            && state.errors.cantidad === ''
            && state.insumo.forma.length > '' && state.errors.forma === ''
            && state.insumo.color.length > '' && state.errors.color === ''
            && state.errors.tamaño === ''
            && state.insumo.material.length > 0 && state.errors.material === ''
            && state.errors.codigo === ''
        ) {
            return false;
        } else {
            return true;
        }
    };

    crearInsumo() {
        insumosAPI.crear(this.state.insumo).then((response) => {
            response.codigo ?
                this.cerrarModal() :
                this.setState({ errorCreacion: 'Ocurrio un error creando el insumo, intente mas tarde' });
        });
    }

    render() {
        return <div>
            <div className='container'>
                <div className='col container clearfix'>
                    <h2 className='float-left'>Inventario de insumos</h2>
                    <button className='btn btn-primary float-right' onClick={() => this.crearInsumoForm()}>+</button>
                </div>
                <div className='col'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Codigo</th>
                                <th scope="col">Material</th>
                                <th scope="col">Tamaño</th>
                                <th scope="col">Color</th>
                                <th scope="col">Forma</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Referencia Confeccion</th>
                                <th scope="col">Detalles</th>
                            </tr>
                        </thead>
                        <tbody>{
                            this.state.insumos.map(u => (
                                <tr key={u.codigo}>
                                    <th scope="row">{u.codigo}</th>
                                    <td>{u.material}</td>
                                    <td>{u.tamaño}</td>
                                    <td>{u.color}</td>
                                    <td>{u.forma}</td>
                                    <td>{u.cantidad}</td>
                                    <td>{u.valor}</td>
                                    <td>{u.referenciaConfeccion}</td>
                                    <td>{u.detalles}</td>
                                </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={`modal fade ${this.state.crearInsumo}`} role="dialog" tabIndex="-1" aria-hidden="true" style={{ display: this.state.modalDisplay, paddingRight: '17px' }}>
                <div className="modal-dialog" role="document" style={{ display: 'block' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Crear Insumo</h5>
                            <button type="button" className="close" onClick={() => this.cerrarModal()} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='form-group'>
                                <label htmlFor='codigo'>Codigo</label>
                                <input
                                    type='number'
                                    className="form-control"
                                    id="codigo"
                                    onChange={this.handleChange}
                                ></input>
                                {this.state.errors.codigo ? <div><span className='text-danger'>{this.state.errors.codigo}</span></div> : <div />}
                                <label htmlFor='material'>Material</label>
                                <input
                                    className="form-control"
                                    id="material"
                                    onChange={this.handleChange}
                                ></input>
                                {this.state.errors.material ? <div><span className='text-danger'>{this.state.errors.material}</span></div> : <div />}
                                <label htmlFor='tamaño'>Tamaño</label>
                                <input
                                    type='number'
                                    className="form-control"
                                    id="tamaño"
                                    onChange={this.handleChange}
                                ></input>
                                {this.state.errors.tamaño ? <div><span className='text-danger'>{this.state.errors.tamaño}</span></div> : <div />}
                                <label htmlFor='color'>Color</label>
                                <input
                                    className="form-control"
                                    id="color"
                                    onChange={this.handleChange}
                                ></input>
                                {this.state.errors.color ? <div><span className='text-danger'>{this.state.errors.color}</span></div> : <div />}
                                <label htmlFor='forma'>Forma</label>
                                <input
                                    className="form-control"
                                    id="forma"
                                    onChange={this.handleChange}
                                ></input>
                                {this.state.errors.forma ? <div><span className='text-danger'>{this.state.errors.forma}</span></div> : <div />}
                                <label htmlFor='cantidad'>Cantidad</label>
                                <input
                                    type='number'
                                    className="form-control"
                                    id="cantidad"
                                    onChange={this.handleChange}
                                ></input>
                                {this.state.errors.cantidad ? <div><span className='text-danger'>{this.state.errors.cantidad}</span></div> : <div />}
                                <label htmlFor='valor'>Valor</label>
                                <input
                                    type='number'
                                    className="form-control"
                                    id="valor"
                                    onChange={this.handleChange}
                                ></input>
                                {this.state.errors.valor ? <div><span className='text-danger'>{this.state.errors.valor}</span></div> : <div />}
                                <label htmlFor="referenciaConfeccion">Referencia Confeccion</label>
                                <input
                                    type='number'
                                    className="form-control"
                                    id="referenciaConfeccion"
                                    onChange={this.handleChange}
                                ></input>
                                {this.state.errors.referenciaConfeccion ? <div><span className='text-danger'>{this.state.errors.referenciaConfeccion}</span></div> : <div />}
                                <label htmlFor="detalles">Detalles</label>
                                <textarea
                                    className="form-control"
                                    id="detalles"
                                    onChange={this.handleChange}
                                />
                                {this.state.errors.detalles ? <div><span className='text-danger'>{this.state.errors.detalles}</span></div> : <div />}
                                <div className='modal-footer'>
                                    {this.state.errorCreacion ? <div><span className='text-danger'>{this.state.errorCreacion}</span></div> : <div />}
                                    <button type="button" className="btn btn-primary" disabled={this.state.error} onClick={() => this.crearInsumo()}>Crear Insumo</button>
                                </div>
                            </form>
                            {this.state.error ? <span className='text-danger'>{this.state.mensaje}</span> : <div />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

}

export default Dashboard;