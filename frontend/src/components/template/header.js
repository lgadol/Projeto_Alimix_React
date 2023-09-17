import './header.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default props => {
    const navigate = useNavigate();

    return (
        <header className="header-top d-none d-sm-flex align-items-center">
            <h1 className="mt-5">
                <Link to="/home">
                    <i>Alimix</i>
                </Link>
            </h1>
        </header>
    );
}