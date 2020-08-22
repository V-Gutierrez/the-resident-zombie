import React, { Fragment, useState, useContext, useEffect } from 'react';
import { GlobalActions } from '../../Context/Context';
import { safetyModifier, latlongParser } from '../../Utils/index';
import { Map, TileLayer, Marker } from 'react-leaflet';
import './styles.css';

export default function SurvivorUpdateForm() {
    const [dataPayload, setDataPayload] = useState({});
    const { dispatch, fetchSingleSurvivor } = useContext(GlobalActions);

    useEffect(() => {
        fetchSingleSurvivor(sessionStorage.getItem('personalId')).then(
            (result) => {
                if (result) {
                    setDataPayload({
                        name: result.name,
                        age: result.age,
                        gender: result.gender,
                        lonlat: latlongParser(result.lonlat),
                    });
                }
            }
        );
    }, [fetchSingleSurvivor]);

    const handleRegistering = (e) => {
        e.preventDefault();

        dispatch({
            type: 'UPDATE_SURVIVOR_LOCATION',
            payload: dataPayload,
            id: sessionStorage.getItem('personalId'),
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

    return (
        <Fragment>
            <form id="update-form" onSubmit={handleRegistering}>
                <label htmlFor="">Your Last Location</label>
                <Map
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

                <button data-cy="send-new-lonlat-btn" type="submit">
                    SEND NEW LOCATION
                </button>
            </form>
        </Fragment>
    );
}
