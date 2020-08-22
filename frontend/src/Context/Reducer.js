import {
    registerSurvivors,
    flagSuspect,
    updateSingleSurvivor,
} from './Services';

export const reducer = async (_, action) => {
    switch (action.type) {
        case 'ADD_SURVIVOR':
            await registerSurvivors(action.payload);
            break;
        case 'UPDATE_SURVIVOR_LOCATION':
            updateSingleSurvivor(action.payload, action.id);
            break;
        case 'FLAG_INFECTED':
            flagSuspect(action.suspect, action.spotter);
            break;
        default:
            break;
    }
};
