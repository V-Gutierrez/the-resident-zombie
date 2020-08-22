import React, {
    useContext,
    Fragment,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { Map, TileLayer, Popup, Tooltip, Marker } from 'react-leaflet';
import { GlobalActions } from '../../Context/Context';
import { latlongParser } from '../../Utils/index';
import './styles.css';

export default function SurvivorTracker() {
    const { fetchSurvivors } = useContext(GlobalActions);
    const [survivors, setSurvivors] = useState([]);

    const fetchSurvivorsData = useCallback(async () => {
        try {
            const request = await fetchSurvivors();
            setSurvivors(request);
        } catch (error) {
            console.error(error);
        }
    }, [fetchSurvivors]);

    useEffect(() => {
        fetchSurvivorsData();
    }, [fetchSurvivorsData]);

    return (
        <Fragment>
            <Map center={[0, 0]} animate={true} zoom={2.5}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {survivors &&
                    survivors.map((survivor) => (
                        <Marker
                            key={survivor.id}
                            position={latlongParser(survivor.lonlat)}
                        >
                            <Popup>{survivor.lonlat}</Popup>
                            <Tooltip>{survivor.name}</Tooltip>
                        </Marker>
                    ))}
            </Map>
        </Fragment>
    );
}
