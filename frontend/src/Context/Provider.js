import React, { useReducer } from 'react';
import { GlobalActions } from './Context';
import { reducer } from './Reducer';
import {
    fetchSurvivors,
    fetchSingleSurvivor,
    fetchReportsData,
    fetchSurvivorItems,
} from './Services';

export function GlobalActionsProvider({ children }) {
    const [_, dispatch] = useReducer(reducer, []);

    return (
        <GlobalActions.Provider
            value={{
                dispatch,
                fetchSurvivors,
                fetchSingleSurvivor,
                fetchReportsData,
                fetchSurvivorItems,
            }}
        >
            {children}
        </GlobalActions.Provider>
    );
}
