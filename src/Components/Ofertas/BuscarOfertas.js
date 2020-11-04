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
            <div className='container'>
                <h1>Crear Oferta</h1>
                <div className='col'>
                    <form className='form-group' onSubmit={this.handleSubmit}>
                        <label htmlFor="tipoOferta">Tipo Oferta</label>
                        <select
                            className="form-control"
                            id="tipoOferta"
                            onChange={this.handleChange}
                            value={this.state.tipoOferta}
                        >
                            <option value='CONFECCION_ROPA_INTERIOR'>confeccion ropa interior"T"</option>
                            <option value='CONFECCION_MAQUINA_PLANA'>confeccion maquina plana"T"</option>
                            <option value='CONFECCION_PANTALON'>confeccion pantalon"T"</option>
                            <option value='CONFECCION_PARA_DAMA'>confeccion ropa dama"T"</option>
                            <option value='CONFECCION_DE_TAPABOCAS'>confeccion tapabocas"T"</option>
                            <option value='CONFECCION_DE_BEBE'>confeccion de bebe"T"</option>
                            <option value='CONFECCION_COBIJAS'>confeccion cobijas"T"</option>
                            <option value='SOLO_ROPA_INTERIOR_PARA_BEBE_EN_ALGODON'>solo ropa interior para bebe en algodon"P"</option>
                            <option value='SE_CONFECCIONAN_MAMELUCOS'>se confeccionan mamelucos"P"</option>
                            <option value='SE_CONFECCIONAN_MEDIAS_PARA_ADULTOS'>se confecciona medias para aulto"P"</option>
                            <option value='SE_CONFECCIONA_DELANTALES'>se confeccionan delantales"P"</option>
                            <option value='SE_CONFECIONA_PANTALONES'>se confecciona pantalones"P"</option>
                            <option value='SE_CONFECCIONAN_CORTINAs'>se confeccionan cortinas"P"</option>
                        </select>
                        <label htmlFor="detalle">Detalle</label>
                        <textarea
                            className="form-control"
                            id="detalle"
                            onChange={this.handleChange}
                            value={this.state.detalle}
                        />
                        {this.state.errors.detalle ? <div><span className='error'>{this.state.errors.detalle}</span></div> : <div />}
                        <br />
                        <button className='btn btn-primary' disabled={this.state.error}>Crear</button>
                    </form>
                    {this.state.error ? <span className='error'>{this.state.mensaje}</span> : <div />}
                    {this.state.id ? <span className='info'>La oferta fue creada con el id: {this.state.id}</span> : <div />}
                </div>
                <h1>Buscar Ofertas</h1>
                <div className='col'>
                    <div>Ofertas disponibles</div>
                    <ul className='list-group'>{
                        this.state.ofertas.map(u => (
                            <li className='list-group-item d-flex justify-content-between align-items-center' key={u.id}>
                                <Link to={`${this.props.match.url}/${u.id}`}>{u.detalle}</Link>
                            </li>
                        ))}</ul>
                </div>
                <br />
            </div>
        );
    }
}

export default BuscarOfertas;