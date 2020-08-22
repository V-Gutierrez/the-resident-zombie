import React, { Fragment, useContext, useRef } from 'react';
import './styles.css';
import { GlobalActions } from '../../Context/Context';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export default function AsideForm() {
    const { fetchSingleSurvivor } = useContext(GlobalActions);
    const history = useHistory();
    const idInput = useRef();

    const checkUserAuthenticity = async (e) => {
        e.preventDefault();

        try {
            const request = await fetchSingleSurvivor(idInput.current.value);

            if (request) {
                sessionStorage.setItem('personalId', idInput.current.value);
                toast.success('You will be redirected to dashboard');
            }

            const delayToRedirectinMilliseconds = 3000;
            setTimeout(() => {
                history.push('/dashboard');
            }, delayToRedirectinMilliseconds);
        } catch (error) {
            toast.error('Invalid or inexistent Survivor ID');
        }
    };

    return (
        <Fragment>
            <form
                className="survivor-form"
                id="aside-form"
                onSubmit={checkUserAuthenticity}
            >
                <h3>I already have an ID</h3>
                <input
                    ref={idInput}
                    type="text"
                    pattern="[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
                    data-testid="ID-input"
                />
                <button type="submit">Survive !</button>
            </form>
        </Fragment>
    );
}
