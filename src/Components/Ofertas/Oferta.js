import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';
import ofertasAPI from '../../api';

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
        ofertasAPI.get(this.state.id).then((response) =>{ 
            this.setState({...response});
        });
    }

    render() {
        return <div>{
            this.state.detalle ?
                <div>
                    <h1>{this.state.tipoOferta}</h1>
                    <p>{this.state.detalle}</p>
                    <label>Fecha creacion: </label>
                    <div>{this.state.fecha}</div>
                    <label>Usuario Creacion: </label>
                    <div><Link to={`/perfil/${this.state.numeroIdentificacion}/${this.state.usuario}`}>{this.state.usuario}</Link></div>
                </div> :
                <NotFound></NotFound>
        }</div>
    };
};

export default Oferta;
