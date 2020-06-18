import React from 'react';
import { Link } from 'react-router-dom';
import OfertasApi from '../../api';
import { validarTexto, validarVacio } from '../../Utils/Validaciones';



class BuscarOfertas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: true,
            errors: {
                detalle: '',
            },
            mensaje: '',
            numeroIdentificacion: this.props.id,
            id: '',
            tipoOferta: 'CC',
            detalle: '',
            ofertas: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.mapUser = this.mapUser.bind(this);
    }

    mapUser = url => {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const publicacion = {
            detalle: this.state.detalle,
            tipoOferta: this.state.tipoOferta,
            fecha: new Date(),
            numeroIdentificacion: this.state.numeroIdentificacion,
        }
        OfertasApi.crear(publicacion).then(creada => {
            if (creada.id) {
                this.setState({ id: creada.id });
            } else {
                let mensaje = this.state.mensaje;
                if (creada.status === 400) {
                    mensaje = 'Existe un problema con los datos, por favor revise que esten correctos.';
                } else {
                    mensaje = 'No se pudo obtener el id de la oferta creada';
                }
                this.setState({ error: true, mensaje });
            }
        });
    };


    handleChange(change) {
        const campo = change.target.id;
        const value = change.target.value;
        this.validateChange(campo, value);
    };

    validateChange(campo, value) {
        let errors = this.state.errors;
        let error = this.state.error;
        switch (campo) {
            case 'detalle':
                errors.detalle = validarTexto(value) + validarVacio(value);
                error = 0 < errors.detalle.length
                break;
            default:
                break;
        }
        error = error || this.validarCamposObligatorios();
        this.setState({ errors, [campo]: value, error });
    };

    validarCamposObligatorios() {
        const state = this.state;
        if (state.detalle.length > 0 && state.errors.detalle === '') {
            return false;
        } else {
            return true;
        }
    };

    componentDidMount() {
        OfertasApi.all().then((response) => response).then((response) => this.setState({ ofertas: response }));
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Crear Oferta</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="tipoOferta">Tipo Oferta</label>
                        <select
                            id="tipoOferta"
                            onChange={this.handleChange}
                            value={this.state.tipoOferta}
                        >
                            <option value='CC'>Cedula de ciudadania</option>
                            <option value='T'>T</option>
                        </select>
                        <br />
                        <label htmlFor="detalle">Detalle</label>
                        <textarea
                            id="detalle"
                            onChange={this.handleChange}
                            value={this.state.detalle}
                        />
                        <br />
                        {this.state.errors.detalle ? <div><span className='error'>{this.state.errors.detalle}</span></div> : <div />}
                        <button disabled={this.state.error}>Crear</button>
                    </form>
                    {this.state.error ? <span className='error'>{this.state.mensaje}</span> : <div />}
                    {this.state.id ? <span className='info'>La oferta fue creada con el id: {this.state.id}</span> : <div />}
                </div>
                <div>
                    <h1>Buscar Ofertas</h1>
                    <div>Ofertas disponibles</div>
                    <ul>{
                        this.state.ofertas.map(u => (
                            <li key={u.id}>
                                <Link to={`${this.props.match.url}/${u.id}`}>{u.detalle}</Link>
                            </li>
                        ))}</ul>
                </div>

            </div>
        );
    }
}

export default BuscarOfertas;