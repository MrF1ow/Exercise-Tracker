import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navigation() {
    return (
        <nav className="navbar">
            <header> <h1 className="navbarTitle">Exercise Tracker</h1></header>
            <div className='navbarLinks'>
                <Link to="/" className="navbarItem">Home</Link>
                <Link to="/create-exercise" className="navbarItem">Add</Link>
            </div>
        </nav>
    )
}

export default Navigation;