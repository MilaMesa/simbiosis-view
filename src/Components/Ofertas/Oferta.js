import React from 'react';
import NotFound from '../NotFound';

class Oferta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.id,
        };

    }

    render() {
        return <div></div>
    };
};

export default Oferta;
