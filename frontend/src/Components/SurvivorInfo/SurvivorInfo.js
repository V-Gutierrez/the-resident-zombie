import React, { Fragment, useContext, useEffect, useState } from 'react';
import { GlobalActions } from '../../Context/Context';
import './styles.css';
import { latlongParser } from '../../Utils/index';
import { Map, TileLayer, Marker } from 'react-leaflet';

export default function SurvivorInfo({ id }) {
    const { fetchSurvivorItems, fetchSingleSurvivor } = useContext(
        GlobalActions
    );
    const [inventoryData, setInventoryData] = useState([]);
    const [survivorData, setSurvivorData] = useState([]);

    useEffect(() => {
        Promise.all([fetchSurvivorItems(id), fetchSingleSurvivor(id)]).then(
            (response) => {
                setInventoryData(response[0]);
                setSurvivorData(response[1]);
            }
        );
    }, [fetchSingleSurvivor, fetchSurvivorItems, id]);

    return (
        <Fragment>
            <section className="info-wrapper">
                <div className="info-inventory">
                    <div className="user-info">
                        <h2>{survivorData.name}</h2>
                        <p>
                            Created at:{' '}
                            {new Date(survivorData.created_at).toLocaleString()}
                        </p>
                        <p>
                            Updated at:{' '}
                            {new Date(survivorData.updated_at).toLocaleString()}
                        </p>
                    </div>
                    {inventoryData &&
                        inventoryData.map((item) => {
                            return (
                                <div key={item.location} className="info-item">
                                    <p>Item: {item.item.name}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>
                                        Evaluation:{' '}
                                        {item.quantity * item.item.points}{' '}
                                        points
                                    </p>
                                </div>
                            );
                        })}
                    <h2>
                        Total Points:{' '}
                        {inventoryData.reduce(
                            (acc, item) =>
                                acc + item.item.points * item.quantity,
                            0
                        )}
                    </h2>
                </div>
                <Map center={latlongParser(survivorData.lonlat)} zoom={10}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={latlongParser(survivorData.lonlat)} />
                </Map>
            </section>
        </Fragment>
    );
}
