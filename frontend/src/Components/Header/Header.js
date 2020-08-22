import React, { Fragment } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <Fragment>
            <header className="app-header">
                <nav className="link-box">
                    <Link data-cy="to-dashboard-link" to="/dashboard">
                        DASHBOARD
                    </Link>
                    <Link
                        data-cy="signout-link"
                        onClick={() => sessionStorage.clear()}
                        to="/"
                    >
                        GIVE UP AND BE CANCELLED
                    </Link>
                    <Link data-cy="to-update-link" to="/update">
                        UPDATE MY LOCATION
                    </Link>
                </nav>
                <h1>TRZ (The Resident Zombie)</h1>
            </header>
        </Fragment>
    );
}
