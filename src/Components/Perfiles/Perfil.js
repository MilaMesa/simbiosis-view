import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            perfil: {},
            error: false,
            id: props.match.params.id,
            errorMessage: '',
        }
    };

    componentDidMount() {
        fetch("http://localhost:8080/perfil/" + this.state.id)
            .then(async response => {
                const data = await response.json();
                let error = this.state.error;

                if (!response.ok) {
                    error = true;
                    const refuse = (data && data.message) || response.statusText;
                    return Promise.reject(refuse);
                }

                this.setState({ perfil: data, error })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString(), error: true });
                console.error('There was an error!', error);
            });

    }

    render() {
        if(this.state.errorMessage){
            return (<div>{this.state.errorMessage}</div>);
        }
        if(this.state.error){
            return(<NotFound></NotFound> );
        }
        return (
            this.state.perfil.id ?
                <div>
                    <h1>{this.state.perfil.nombre} (id: {this.state.perfil.id})</h1>
                    <h2>Proyecto: {this.state.perfil.project}</h2>
                    <Link to="/perfiles">Back</Link>
                </div>:
                <div>... Cargando</div>
        );
    }
};


export default Perfil;