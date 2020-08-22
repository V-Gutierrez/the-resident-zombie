import React, {
    useContext,
    useEffect,
    useState,
    useCallback,
    Fragment,
    useRef,
} from 'react';
import { GlobalActions } from '../../Context/Context';
import './styles.css';
import SurvivorCard from '../SurvivorCard/SurvivorCard';

export default function SurvivorsList() {
    const { fetchSurvivors } = useContext(GlobalActions);
    const [survivors, setSurvivors] = useState([]);
    const [search, setSearch] = useState([]);
    const searchInput = useRef();

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

    const searchSurvivor = () => {
        setSearch(searchInput.current.value);
    };

    return (
        <Fragment>
            <div className="search-box">
                <input
                    data-cy="search-survivor-input"
                    onChange={searchSurvivor}
                    ref={searchInput}
                    type="text"
                    placeholder="Looking for a survivor? Type here"
                />
                <button onClick={searchSurvivor} data-testid="search-button">
                    SEARCH
                </button>
            </div>
            <section className="survivor-wrapper">
                {survivors &&
                    survivors.map((survivor) =>
                        search === '' || survivor.name.includes(search) ? (
                            <SurvivorCard key={survivor.id} {...survivor} />
                        ) : (
                            <></>
                        )
                    )}
            </section>
        </Fragment>
    );
}
