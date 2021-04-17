import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

import { AuthContext } from '../../../context/AuthContext';

const NavLinks = (props) => {
    const auth = useContext(AuthContext);
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>
            { auth.isLoggedIn && (
                <li>
                    <NavLink to="/u1/places">MY PLACES</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/places/new">ADD PLACE</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink onClick={auth.logout} to="/">Logout</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth">SIGN IN</NavLink>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;