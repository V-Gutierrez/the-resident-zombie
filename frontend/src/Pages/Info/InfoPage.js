import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import SurvivorInfo from '../../Components/SurvivorInfo/SurvivorInfo';

export default function InfoPage() {
    const params = useParams();

    return (
        <Fragment>
            <SurvivorInfo id={params.id} />
        </Fragment>
    );
}
