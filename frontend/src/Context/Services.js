import trzApi from '../Services/api';
import { toast } from 'react-toastify';

const peopleEndpoints = {
    repostInfected: (id) => `people/${id}/report_infection.json`,
    fetchOrRegister: `/people.json`,
    fetchOrUpdateSingleSurvivor: (id) => `people/${id}.json`,
    reportInfection: (id) => `/people/${id}/report_infection.json`,
    getSurvivorItems: (id) => `/people/${id}/properties.json`,
};

export const registerSurvivors = async (payload) => {
    const requestBody = {
        name: payload.name,
        age: payload.age,
        gender: payload.gender,
        lonlat: `POINT (${payload.lonlat[1]} ${payload.lonlat[0]})`,
        items: `Fiji Water: ${payload.inventory.fijiWater}; Campbell Soup: ${payload.inventory.campbellSoup}; first aid pouch: ${payload.inventory.firstAid}; AK47: ${payload.inventory.ak47}`,
    };

    try {
        const request = await trzApi.post(
            peopleEndpoints.fetchOrRegister,
            requestBody
        );

        sessionStorage.setItem('personalId', request.data.id);

        toast.success('Well done, you will be redirected to dashboard');
    } catch (error) {
        toast.error('Something went wrong, survivor');
    }
};

export const fetchSurvivors = async () => {
    try {
        const request = await trzApi.get(peopleEndpoints.fetchOrRegister);

        return request.data;
    } catch (error) {
        toast.error('Something went wrong, survivor');
    }
};
export const flagSuspect = async (infected, spotter) => {
    try {
        await trzApi.post(peopleEndpoints.reportInfection(spotter), {
            infected: infected,
        });

        toast.warn('That is some serious accusation, we hope you are wrong...');
    } catch (error) {
        toast.error(
            "Something went wrong while flagging this survivor, you can't flag someone twice"
        );
    }
};

export const fetchSingleSurvivor = async (id) => {
    try {
        const request = await trzApi.get(
            peopleEndpoints.fetchOrUpdateSingleSurvivor(id)
        );

        return request.data;
    } catch (error) {
        toast.error('Something went wrong, survivor');
    }
};

export const updateSingleSurvivor = async (payload, id) => {
    const requestBody = {
        name: payload.name,
        age: payload.age,
        gender: payload.gender,
        lonlat: `POINT (${payload.lonlat[1]} ${payload.lonlat[0]})`,
    };

    try {
        await trzApi.patch(
            peopleEndpoints.fetchOrUpdateSingleSurvivor(id),
            requestBody
        );

        toast.success('Your location is now updated');
    } catch (error) {
        toast.error('There is been an error updating your location');
    }
};

const reportEndpoints = {
    infectionAverage: 'report/infected.json',
    healthinessAverage: 'report/non_infected.json',
    inventoryAverage: 'report/people_inventory.json',
    lostPointsDueToInfection: 'report/infected_points.json',
};

export const fetchReportsData = async () => {
    try {
        const requests = await Promise.all([
            trzApi.get(reportEndpoints.infectionAverage),
            trzApi.get(reportEndpoints.healthinessAverage),
            trzApi.get(reportEndpoints.inventoryAverage),
            trzApi.get(reportEndpoints.lostPointsDueToInfection),
        ]);

        return requests.map((request) => request.data.report);
    } catch (error) {
        toast.error('An error occurred while retrieving reports');
    }
};

export const fetchSurvivorItems = async (id) => {
    try {
        const request = await trzApi.get(peopleEndpoints.getSurvivorItems(id));

        return request.data;
    } catch (error) {
        toast.error('Error while retrieving this user inventory');
    }
};
