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
            id: this.props.id,
            tipoOferta: 'CC',
            detalle: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    mapUser = url => {
        OfertasApi.all().map(u => (
            <li key={u.id}>
                <Link to={`${url}/${u.id}`}>{u.detalle}</Link>
            </li>
        ));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const publicacion = {
            detalle: this.state.detalle,
            tipoOferta: this.state.tipoOferta,
            fecha: new Date(),
            usuario: this.props.userName,
            numeroIdentificacion: this.state.id,
        }
        console.log(publicacion);

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
                            <option value='CC' selected="selected">Cedula de ciudadania</option>
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
                    {this.state.error ? <span>{this.state.mensaje}</span> : <div />}
                </div>
                <div>
                    <h1>Buscar Ofertas</h1>
                    <div>Ofertas disponibles</div>
                    <ul>{this.mapUser(this.props.match.url)}</ul>
                </div>

            </div>
        );
    }
}

export default BuscarOfertas;