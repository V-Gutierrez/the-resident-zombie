import React, { Fragment } from 'react';

import './App.css';
import Routes from './Pages/Routes/Routes';
import { GlobalActionsProvider } from './Context/Provider';

function App() {
    return (
        <Fragment>
            <GlobalActionsProvider>
                <Routes />
            </GlobalActionsProvider>
        </Fragment>
    );
}

export default App;
