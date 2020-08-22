import React, { Fragment } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import SignSurvivorPage from '../SignSurvivor/SignSurvivorPage';
import SurvivorDashboardPage from '../SurvivorDashboard/SurvivorDashboardPage';
import Header from '../../Components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from '../ProtectedRoute/PrivateRoute';
import LoginRoute from '../ProtectedRoute/LoginRoute';
import SurvivorUpdatePage from '../SurvivorUpdate/SurvivorUpdatePage';
import Footer from '../../Components/Footer/Footer';
import InfoPage from '../Info/InfoPage';
import NotFoundPage from '../NotFound/NotFoundPage';

export default function Routes() {
    return (
        <Fragment>
            <ToastContainer />
            <BrowserRouter>
                <Header />
                <Switch>
                    <LoginRoute exact path="/" component={SignSurvivorPage} />
                    <PrivateRoute
                        path="/dashboard"
                        component={SurvivorDashboardPage}
                    />
                    <PrivateRoute
                        path="/update"
                        component={SurvivorUpdatePage}
                    />
                    <PrivateRoute path="/info/:id" component={InfoPage} />
                    <Route path="*" component={NotFoundPage} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </Fragment>
    );
}
