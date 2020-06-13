import React from 'react';
import { Link } from 'react-router-dom';
import UsersAPI from '../../api';

const mapUser = url =>
    UsersAPI.all().map(u => (
        <li key={u.id}>
            <Link to={`${url}/${u.id}/${u.name}`}>{u.name}</Link>
        </li>
    ));

const AllUsers = ({ match }) => (
    <div>
        <ul>{mapUser(match.url)}</ul>
    </div>
);
export default AllUsers;