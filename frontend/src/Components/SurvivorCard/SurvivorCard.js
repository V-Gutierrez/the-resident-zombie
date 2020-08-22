import React, { Fragment, useContext } from 'react';
import './styles.css';
import { GlobalActions } from '../../Context/Context';
import { idParserFromUrl } from '../../Utils/index';
import { useHistory } from 'react-router-dom';

export default function SurvivorCard({
    location,
    name,
    age,
    gender,
    infected,
}) {
    const { dispatch } = useContext(GlobalActions);
    const history = useHistory();

    const flagSuspect = () => {
        dispatch({
            type: 'FLAG_INFECTED',
            suspect: idParserFromUrl(location),
            spotter: sessionStorage.getItem('personalId'),
        });
    };

    const routeToInfoPage = () =>
        history.push(`/info/${idParserFromUrl(location)}`);

    return (
        <Fragment>
            <span
                data-cy="survivor-card"
                className={infected ? 'infected' : 'card'}
            >
                <p data-testid="survivor-name">{name}</p>
                <p data-testid="survivor-age">Age: {age}</p>
                <p data-testid="survivor-gender">
                    Gender: {gender === 'M' ? 'Male' : 'Female'}
                </p>

                {infected ? (
                    <Fragment>
                        <b data-testid="warning-message"> WARNING </b>
                        <b data-testid="infected-message">INFECTION DETECTED</b>
                    </Fragment>
                ) : (
                    <Fragment>
                        <button
                            data-cy="flag-survivor-btn"
                            onClick={flagSuspect}
                        >
                            Flag as infected
                        </button>
                        <button onClick={routeToInfoPage}>Info</button>
                    </Fragment>
                )}
            </span>
        </Fragment>
    );
}
