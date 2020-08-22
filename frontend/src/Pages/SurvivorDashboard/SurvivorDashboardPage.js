import React, { Fragment } from 'react';
import SurvivorsList from '../../Components/SurvivorsList/SurvivorsList';
import SurvivorTracker from '../../Components/SurvivorsTracker/SurvivorsTracker';
import './styles.css';

export default function SurvivorDashboardPage() {
    return (
        <Fragment>
            <section id="dashboard-wrapper">
                <SurvivorsList />
                <SurvivorTracker />
            </section>
        </Fragment>
    );
}
