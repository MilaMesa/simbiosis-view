import React from 'react';
import { Link } from 'react-router-dom';
import OfertasApi from '../../api';
import { validarTexto, validarVacio } from '../../Utils/Validaciones';

const TipoOferta = {
    CONFECCION_MAQUINA_PLANA: "Se confecciona maquina plana",
    CONFECCION_PANTALON: "Se confeccionan pantalones",
    CONFECCION_ROPA_INTERIOR: "Se confecciona ropa interior",
    CONFECCION_PARA_DAMA: "Se confecciona ropa dama",
    CONFECCION_DE_TAPABOCAS: "Se confeccionan tapabocas",
    CONFECCION_DE_BEBE: "Se confecciona ropa de bebe",
    CONFECCION_COBIJAS: "Se confeccionan cobijas",
    SOLO_ROPA_INTERIOR_PARA_BEBE_EN_ALGODON: "Solo ropa interior para bebe en algodon",
    SE_CONFECCIONAN_MAMELUCOS: "Se confeccionan mamelucos",
    SE_CONFECCIONAN_MEDIAS_PARA_ADULTOS: "Se confecciona medias para aulto",
    SE_CONFECCIONA_DELANTALES: "Se confeccionan delantales",
    SE_CONFECIONA_PANTALONES: "Se confeccionan pantalones",
    SE_CONFECCIONAN_CORTINAS: "Se confeccionan cortinas"
};

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
                            <option value='CONFECCION_ROPA_INTERIOR'>{TipoOferta.CONFECCION_ROPA_INTERIOR}</option>
                            <option value='CONFECCION_MAQUINA_PLANA'>{TipoOferta.CONFECCION_MAQUINA_PLANA}</option>
                            <option value='CONFECCION_PANTALON'>{TipoOferta.CONFECCION_PANTALON}</option>
                            <option value='CONFECCION_PARA_DAMA'>{TipoOferta.CONFECCION_PARA_DAMA}</option>
                            <option value='CONFECCION_DE_TAPABOCAS'>{TipoOferta.CONFECCION_DE_TAPABOCAS}</option>
                            <option value='CONFECCION_DE_BEBE'>{TipoOferta.CONFECCION_DE_BEBE}</option>
                            <option value='CONFECCION_COBIJAS'>{TipoOferta.CONFECCION_COBIJAS}</option>
                            <option value='SOLO_ROPA_INTERIOR_PARA_BEBE_EN_ALGODON'>{TipoOferta.SOLO_ROPA_INTERIOR_PARA_BEBE_EN_ALGODON}</option>
                            <option value='SE_CONFECCIONAN_MAMELUCOS'>{TipoOferta.SE_CONFECCIONAN_MAMELUCOS}</option>
                            <option value='SE_CONFECCIONAN_MEDIAS_PARA_ADULTOS'>{TipoOferta.SE_CONFECCIONAN_MEDIAS_PARA_ADULTOS}</option>
                            <option value='SE_CONFECCIONA_DELANTALES'>{TipoOferta.SE_CONFECCIONA_DELANTALES}</option>
                            <option value='SE_CONFECIONA_PANTALONES'>{TipoOferta.SE_CONFECIONA_PANTALONES}</option>
                            <option value='SE_CONFECCIONAN_CORTINAS'>{TipoOferta.SE_CONFECCIONAN_CORTINAS}</option>
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
                    <div class="list-group">{
                        this.state.ofertas.map(u => (
                            <div key={u.id}>
                                <Link className='list-group-item list-group-item-action flex-column align-items-start' to={`${this.props.match.url}/${u.id}`}>
                                    <div className='d-flex w-100 justify-content-between'>
                                        <h5 class="mb-1">{TipoOferta[u.tipoOferta]}</h5>
                                        <small class="text-muted">{u.fecha}</small>
                                    </div>
                                    <p class="mb-1">{u.detalle}</p>
                                    <small class="text-muted">{u.usuario}</small>
                                </Link>
                            </div>
                        ))}</div>
                </div>
                <br />
            </div>
        );
    }
}

export default BuscarOfertas;