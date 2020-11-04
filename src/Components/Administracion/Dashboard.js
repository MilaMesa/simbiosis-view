import React from 'react';
import { insumosAPI } from '../../api';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            insumos: []
        };
    }

    componentDidMount() {
        insumosAPI.all().then((response) => {
            this.setState({ insumos: response });
        });
    }

    render() {
        return <div className='container'>
            <h1>Inventario de insumos</h1>
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
    }

}

export default Dashboard;