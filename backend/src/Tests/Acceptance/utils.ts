export const persistentSurvivorUUID = '5f6e55ac-e49e-4222-b386-0ab1b1294568';

export const persistentSurvivorDataModel = {
    result: [
        {
            id: '5f6e55ac-e49e-4222-b386-0ab1b1294568',
            survivor: {
                name: 'Fabio Akita',
                age: 37,
                gender: 'M',
                latitude: -23.619814,
                longitude: -46.668463,
            },
            infected: false,
        },
    ],
};

export const persistentSurvivorInventory = {
    inventory: [
        {
            owner: '5f6e55ac-e49e-4222-b386-0ab1b1294568',
            inventory: {
                fiji_water: 23,
                campbell_soup: 13,
                first_aid_pouch: 43,
                AK47: 2,
            },
            fiji_water_value: 14,
            campbell_soup_value: 12,
            first_aid_pouch_value: 10,
            AK47_value: 8,
        },
    ],
};

export const generatedSurvivor = {
    name: `Tester - ${Date.now()}`,
    age: 42,
    gender: 'F',
    latitude: 22.4312,
    longitude: 9.00023123,
    fiji_water: `${Math.floor(Math.random() * 10)}`,
    campbell_soup: `${Math.floor(Math.random() * 10)}`,
    AK47: `${Math.floor(Math.random() * 10)}`,
    first_aid_pouch: `${Math.floor(Math.random() * 10)}`,
};

export const errorMessage = {
    error:
        "This route is not operable or does not support DELETE method, check documentation in '/api/docs' or https://documenter.getpostman.com/view/11590560/T1LSB5Ma?version=latest",
};
