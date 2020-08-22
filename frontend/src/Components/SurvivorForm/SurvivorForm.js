/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import './styles.css';
import { dreamWorkLat, dreamWorkLng, safetyModifier } from '../../Utils/index';
import { GlobalActions } from '../../Context/Context';
import { useHistory } from 'react-router-dom';
import AsideForm from './AsideForm';

export default function SurvivorForm() {
    const [dataPayload, setDataPayload] = useState({
        name: '',
        age: 0,
        lonlat: [dreamWorkLat, dreamWorkLng],
    });

    const { dispatch } = useContext(GlobalActions);
    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setDataPayload({
                    ...dataPayload,
                    lonlat: [latitude + safetyModifier, longitude],
                });
            },
            () => {},
            {
                timeout: 30000,
                enableHighAccuracy: true,
            }
        );
    }, []);

    const handleInserts = (event) => {
        const { value, id } = event.target;
        setDataPayload({ ...dataPayload, [id]: value });
    };

    const handleInventoryInserts = (event) => {
        const { value, id } = event.target;
        setDataPayload({
            ...dataPayload,
            inventory: { ...dataPayload.inventory, [id]: value },
        });
    };

    const handleMapClick = (event) => {
        setDataPayload({
            ...dataPayload,
            lonlat: [event.latlng.lat, event.latlng.lng],
        });

        const scrambleLocalizationDelayInMiliSeconds = 3500;

        setTimeout(() => {
            setDataPayload({
                ...dataPayload,
                lonlat: [event.latlng.lat + safetyModifier, event.latlng.lng],
            });
        }, scrambleLocalizationDelayInMiliSeconds);
    };

    const handleRegistering = (e) => {
        e.preventDefault();

        dispatch({ type: 'ADD_SURVIVOR', payload: dataPayload });

        const delayToRedirectinMilliseconds = 3000;

        setTimeout(() => {
            history.push('/dashboard');
        }, delayToRedirectinMilliseconds);
    };

    return (
        <Fragment>
            <main className="app-container">
                <form className="survivor-form" onSubmit={handleRegistering}>
                    <h3>Create my survivor account</h3>
                    <label htmlFor="name">Name</label>
                    <input
                        data-cy="input-name"
                        required
                        onChange={handleInserts}
                        id="name"
                        type="text"
                    />
                    <label htmlFor="age">Age</label>
                    <input
                        data-cy="input-age"
                        required
                        onChange={handleInserts}
                        id="age"
                        type="number"
                        min={0}
                    />
                    <label htmlFor="gender">Gender</label>
                    <div className="gender-box">
                        <label htmlFor="female">Female</label>
                        <input
                            data-cy="input-gender-female"
                            required
                            id="gender"
                            onChange={handleInserts}
                            type="radio"
                            name="gender"
                            value="F"
                        />
                        <label htmlFor="male">Male</label>
                        <input
                            data-cy="input-gender-male"
                            required
                            id="gender"
                            onChange={handleInserts}
                            type="radio"
                            name="gender"
                            value="M"
                        />
                    </div>
                    <h3 htmlFor="">Your Last Location</h3>
                    <Map
                        className="map-frame"
                        center={dataPayload.lonlat}
                        zoom={10}
                        onClick={handleMapClick}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={dataPayload.lonlat} />
                    </Map>

                    <p id="user-alert">
                        (Your location will automatically masked for your own
                        safety)
                    </p>
                    <label htmlFor="fijiWater">
                        Fiji Water{' '}
                        {dataPayload.inventory === undefined
                            ? 0
                            : dataPayload.inventory.fijiWater}{' '}
                    </label>
                    <input
                        required
                        onChange={handleInventoryInserts}
                        type="number"
                        min={0}
                        id="fijiWater"
                    />
                    <label htmlFor="campbellSoup">
                        Campbell Soup{' '}
                        {dataPayload.inventory === undefined
                            ? 0
                            : dataPayload.inventory.campbellSoup}{' '}
                    </label>
                    <input
                        required
                        onChange={handleInventoryInserts}
                        type="number"
                        min={0}
                        id="campbellSoup"
                    />
                    <label htmlFor="firstAid">
                        First Aid{' '}
                        {dataPayload.inventory === undefined
                            ? 0
                            : dataPayload.inventory.firstAid}{' '}
                    </label>
                    <input
                        required
                        onChange={handleInventoryInserts}
                        type="number"
                        min={0}
                        id="firstAid"
                    />
                    <label htmlFor="ak47">
                        AK 47 (quite an asset, I must say){' '}
                        {dataPayload.inventory === undefined
                            ? 0
                            : dataPayload.inventory.ak47}{' '}
                    </label>
                    <input
                        required
                        onChange={handleInventoryInserts}
                        type="number"
                        min={0}
                        id="ak47"
                    />
                    <button
                        data-cy="submit-newsurvivor-button"
                        data-testid="submit-btn"
                        type="submit"
                    >
                        I'm a SURVIVOR
                    </button>
                </form>
                <h1>OR</h1>
                <AsideForm />
            </main>
        </Fragment>
    );
}
