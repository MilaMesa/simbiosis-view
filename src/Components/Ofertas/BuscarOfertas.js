import React from 'react';
import { Link } from 'react-router-dom';
import OfertasApi from '../../api';

const mapUser = url =>
    OfertasApi.all().map(u => (
        <li key={u.id}>
            <Link to={`${url}/${u.id}`}>{u.detalle}</Link> 
        </li>
    ));

const AllUsers = ({ match }) => (
    <div>
        <ul>{mapUser(match.url)}</ul>
    </div>
);
export default AllUsers;