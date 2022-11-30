import React from 'react';
import { urlBase } from '../api';
import './Comentarios.css';

class Comentarios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comentarios: [],
            usuarioId: this.props.usuario,
            usuarioCreacionId: this.props.usuarioCreacion,
            comentario: '',
            mensajeError: '',
        }
        this.crearComentario = this.crearComentario.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.obtenerComentarios = this.obtenerComentarios.bind(this);
        this.cambioValoracion = this.cambioValoracion.bind(this);
    }

    componentDidMount() {
        this.obtenerComentarios();
    }

    obtenerComentarios() {
        fetch(`${urlBase}comentarios/${this.state.usuarioId}`)
            .then((response) => response.json())
            .then((response) => this.setState({ comentarios: response }))
            .catch(error => {
                console.log("Ocurrio un error consultado los comentarios" + { error });
            });
    }

    crearComentario() {
        const comentario = {
            mensaje: this.state.comentario,
            hora: new Date(),
            fecha: new Date(),
            usuarioCreacion: this.state.usuarioCreacionId,
            usuario: this.state.usuarioId,
        }
        fetch(`${urlBase}comentarios/crear`, {
            method: 'POST',
            body: JSON.stringify(comentario),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((response) => {
            if (response.id) {
                this.setState({ comentario: '' });
                this.obtenerComentarios();
            } else {
                this.setState({ mensajeError: 'Ocurrio un error creando el comentario.' });
            }
        })
    }

    handleChange(change) {
        const campo = change.target.id;
        const value = change.target.value;
        this.setState({ [campo]: value, mensajeError: '' });
    }

    cambioValoracion(change) {
        const campo = change.target.id;
        const value = change.target.value;
        var id = campo.split("-")[0];
        const elementsIndex = this.state.comentarios.findIndex(element => element.id === parseInt(id));
        let newArray = [...this.state.comentarios];
        newArray[elementsIndex] = { ...newArray[elementsIndex], valoracion: parseInt(value) };
        this.setState({
            comentarios: newArray,
        });
        fetch(`${urlBase}comentarios/valorar`, {
            method: 'POST',
            body: JSON.stringify({ id, valoracion: value }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    render() {
        return <div className='container'>
            <div className='col'>
                <textarea className='form-control' id="comentario" name="comentario" rows="10" cols="40" onChange={this.handleChange}
                    value={this.state.comentario} />
                <button className='btn btn-primary' disabled={0 === this.state.comentario.length} onClick={this.crearComentario}>Enviar</button>
                {this.state.mensajeError ? <span>{this.state.mensajeError}</span> : <div />}
            </div>
            <div className='col'>
                <div className="list-group">
                    {this.state.comentarios.map(u => (
                        <div key={u.id} className='col'>
                            <div className='list-group-item list-group-item-action flex-column align-items-start'>
                                <div className='d-flex w-100 justify-content-between'>
                                    <h5 className="mb-1">{u.nombreUsuarioCreacion}</h5>
                                    <small className="text-muted">{u.fecha}</small>
                                </div>
                                <p className="mb-1">{u.mensaje}</p>
                                <small className="text-muted">
                                    <form className="valoracion">
                                        <p className="clasificacion">
                                            <input id={`${u.id}-radio1`} type="radio" onClick={this.cambioValoracion} name="estrellas" value={5} checked={u.valoracion === 5} readOnly={true} />
                                            <label htmlFor={`${u.id}-radio1`}>★</label>
                                            <input id={`${u.id}-radio2`} type="radio" onClick={this.cambioValoracion} name="estrellas" value={4} checked={u.valoracion === 4} readOnly={true} />
                                            <label htmlFor={`${u.id}-radio2`}>★</label>
                                            <input id={`${u.id}-radio3`} type="radio" onClick={this.cambioValoracion} name="estrellas" value={3} checked={u.valoracion === 3} readOnly={true} />
                                            <label htmlFor={`${u.id}-radio3`}>★</label>
                                            <input id={`${u.id}-radio4`} type="radio" onClick={this.cambioValoracion} name="estrellas" value={2} checked={u.valoracion === 2} readOnly={true} />
                                            <label htmlFor={`${u.id}-radio4`}>★</label>
                                            <input id={`${u.id}-radio5`} type="radio" onClick={this.cambioValoracion} name="estrellas" value={1} checked={u.valoracion === 1} readOnly={true} />
                                            <label htmlFor={`${u.id}-radio5`}>★</label>
                                        </p>
                                    </form>
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>;
    }
};

export default Comentarios;