import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';
import ofertasAPI from '../../api';
import { TipoOferta } from './TipoOferta';

class Oferta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            fecha: '',
            tipoOferta: '',
            detalle: '',
            numeroIdentificacion: '',
            usuario: '',
        };
    }

    componentDidMount() {
        ofertasAPI.get(this.state.id).then((response) => {
            this.setState({ ...response });
        });
    }

    render() {
        return <div className='container'>{
            this.state.detalle ?
                <div className='col'>
                    <h2 className='text-center'>{TipoOferta[this.state.tipoOferta]}</h2>
                    <p>{this.state.detalle}</p>
                    <div >
                        <label >Fecha creacion: </label>
                        <div className='d-inline'>{` ${this.state.fecha}`}</div>
                    </div>
                    <div>
                        <label >Usuario Creacion: </label>
                        <div className='d-inline'><Link to={`/perfil/${this.state.numeroIdentificacion}/${this.state.usuario}`}>{` ${this.state.usuario}`}</Link></div>
                    </div>
                </div> :
                <NotFound></NotFound>
        }</div>
    };
};

export default Oferta;
