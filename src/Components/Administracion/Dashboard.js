import React from 'react';
import { insumosAPI, perfilAPI } from '../../api';
import generatePDF from "../../Utils/pdfGenerator";
import { validarNumerico, validarTexto, validarVacio } from '../../Utils/Validaciones';
import '../ConjuntoCss/Register.css';


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
        insumosAPI.allUser(this.props.id).then((response) => {
            this.setState({ insumos: response });
        });
    }

    crearInsumoForm() {
        this.setState({ crearInsumo: 'show', modalDisplay: 'block' });
    }

    cerrarModal() {
        this.setState({ crearInsumo: '', modalDisplay: 'none' });
        insumosAPI.allUser(this.props.id).then((response) => {
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

    generarReporte() {
        perfilAPI.get(this.props.id).then((response) => {
            if (response && response.nombre) {
                const reporte = {};
                reporte.encabezado = ["Codigo", "Material", "Tamaño", "Color", "Forma", "Cantidad", "Valor", "Referencia confección", "Detalles"];
                reporte.listado = this.state.insumos;
                reporte.titulo = "Reporte de insumos";
                reporte.autor = response.nombre;
                generatePDF(reporte);
            } else {
                this.setState({ error: true, errorCreacion: 'ocurrio un error generando el archivo' });
            }
        });
    };

    crearInsumo() {
        insumosAPI.crear(this.state.insumo).then((response) => {
            response.codigo ?
                this.cerrarModal() :
                this.setState({ errorCreacion: 'Ocurrio un error creando el insumo, intente mas tarde' });
        });
    };

    render() {
        return <div>
            <div className='container'>
                <div className='col container clearfix'>
                    <h2 className='float-left'>Inventario de insumos</h2>
                    <button className='btn btn-primary float-right' onClick={() => this.crearInsumoForm()}>+</button>
                    {this.state.insumos ?
                        <button className='btn btn-primary float-right' onClick={() => this.generarReporte()}><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-earmark-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
                            <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z" />
                            <path d="M8 6a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 10.293V6.5A.5.5 0 0 1 8 6z" />
                        </svg></button>
                        :
                        <div></div>
                    }
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