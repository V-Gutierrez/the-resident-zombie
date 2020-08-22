import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function NotFoundPage() {
    return (
        <Fragment>
            <main className="notfound-container">
                <h1>The apocalipse is not that way ! </h1>
                <Link to="/">GO BACK</Link>
            </main>
        </Fragment>
    );
}
