import React from 'react';
import { NavLink } from 'react-router-dom';

import '../style.css';

const Navbar = () => {
    return (
        <div className="topnav">
            <h1 className='title-text'>Redox Code Test - FizzBuzz</h1>
            <div className="topnav">
                <NavLink className="selected" to={'/ResolveFizzBuzzNumber'}>
                    Resolve
                </NavLink>
                <NavLink className="selected" to={'/createFizzBuzzResultsList'}>
                    Create
                </NavLink>
                <NavLink className="selected"  to={'/verifyFizzBuzzResults'}>
                    Verify
                </NavLink>
            </div>
        </div>

    );
};
export default Navbar;