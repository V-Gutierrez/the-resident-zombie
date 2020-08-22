import React, { useContext, useEffect, useState, Fragment } from 'react';
import { GlobalActions } from '../../Context/Context';
import './styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Footer() {
    const { fetchReportsData } = useContext(GlobalActions);
    const [reportsData, setReportsData] = useState([]);

    useEffect(() => {
        fetchReportsData().then((response) => {
            setReportsData(response);
        });
    }, [fetchReportsData]);

    return (
        <Fragment>
            <footer data-testid="footer-wrapper" className="app-footer">
                <span data-testid="statistics-svg" className="avg-box">
                    <CircularProgressbar
                        strokeWidth={50}
                        styles={buildStyles({
                            strokeLinecap: 'butt',
                            textSize: '16px',
                            pathTransitionDuration: 0.5,
                            pathColor: 'red',
                            textColor: 'white',
                            trailColor: 'green',
                        })}
                        value={
                            reportsData[0] &&
                            parseInt(reportsData[0].average_infected * 100)
                        }
                        text={`${
                            reportsData[0] &&
                            parseInt(reportsData[0].average_infected * 100)
                        }%`}
                    />
                    <h3>{reportsData[0] && reportsData[0].description}</h3>
                </span>
                <span data-testid="statistics-svg2" className="avg-box">
                    <CircularProgressbar
                        strokeWidth={50}
                        styles={buildStyles({
                            strokeLinecap: 'butt',
                            textSize: '16px',
                            pathTransitionDuration: 0.5,
                            pathColor: 'green',
                            textColor: 'white',
                            trailColor: 'red',
                        })}
                        value={
                            reportsData[1] &&
                            parseInt(reportsData[1].average_healthy * 100)
                        }
                        text={`${
                            reportsData[1] &&
                            parseInt(reportsData[1].average_healthy * 100)
                        }%`}
                    />
                    <h3>{reportsData[1] && reportsData[1].description}</h3>
                </span>
                <span className="avg-box">
                    <h2>
                        {reportsData[2] &&
                            parseInt(
                                reportsData[2]
                                    .average_items_quantity_per_healthy_person
                            )}
                    </h2>
                    <h3>Average items quantity per healthy person</h3>
                </span>
                <span className="avg-box">
                    <h2>
                        {reportsData[2] &&
                            parseInt(
                                reportsData[2].average_items_quantity_per_person
                            )}
                    </h2>
                    <h3>Average items quantity per person</h3>
                </span>
                <span className="avg-box">
                    <h2>
                        {reportsData[3] && reportsData[3].total_points_lost}
                    </h2>
                    <h3>{reportsData[3] && reportsData[3].description}</h3>
                </span>
                <span className="avg-box">
                    <ul>
                        <li>
                            <b>Fiji Water:</b> {'  '}
                            {reportsData[2] &&
                                parseInt(
                                    reportsData[2]
                                        .average_quantity_of_each_item_per_person[
                                        'Fiji Water'
                                    ]
                                )}
                        </li>
                        <li>
                            <b>Campbell Soup:</b> {'  '}
                            {reportsData[2] &&
                                parseInt(
                                    reportsData[2]
                                        .average_quantity_of_each_item_per_person[
                                        'Campbell Soup'
                                    ]
                                )}
                        </li>
                        <li>
                            <b>AK47:</b> {'  '}
                            {reportsData[2] &&
                                parseInt(
                                    reportsData[2]
                                        .average_quantity_of_each_item_per_person[
                                        'AK47'
                                    ]
                                )}
                        </li>
                        <li>
                            <b>First Aid Pouch:</b>{' '}
                            {reportsData[2] &&
                                parseInt(
                                    reportsData[2]
                                        .average_quantity_of_each_item_per_person[
                                        'First Aid Pouch'
                                    ]
                                )}
                        </li>
                    </ul>
                    <h3>Average items quantity per person</h3>
                </span>
            </footer>
        </Fragment>
    );
}
