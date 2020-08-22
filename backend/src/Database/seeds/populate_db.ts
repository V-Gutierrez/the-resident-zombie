import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('survivors').del();
    await knex('inventory').del();

    // Inserts seed entries
    await knex('survivors').insert([
        {
            id: '5f6e55ac-e49e-4222-b386-0ab1b1294568',
            name: 'Fabio Akita',
            age: 37,
            gender: 'M',
            latitude: -23.619814,
            longitude: -46.668463,
        },
        {
            id: '5f6e55ac-e49e-4222-b386-0ab1b1294561',
            name: 'Victor Gutierrez Nt-a-Snr',
            age: 22,
            gender: 'M',
            latitude: -23.619814,
            longitude: -46.668463,
        },
        {
            id: '5f6e55ac-e49e-4222-b386-0ab1b1294562',
            name: 'Fernanda Paes Leme',
            age: 30,
            gender: 'F',
            latitude: -3.136141,
            longitude: -59.952604,
        },
    ]);
    await knex('inventory').insert([
        {
            id: 'ff6e55ac-e49e-4222-b386-0ab1b1294568',
            fiji_water: 23,
            campbell_soup: 13,
            AK47: 2,
            first_aid_pouch: 43,
            owner: '5f6e55ac-e49e-4222-b386-0ab1b1294568',
        },
        {
            id: 'ff6e55ac-e49e-4222-b386-0ab1b1294567',
            fiji_water: 3,
            campbell_soup: 13,
            AK47: 0,
            first_aid_pouch: 0,
            owner: '5f6e55ac-e49e-4222-b386-0ab1b1294561',
        },
        {
            id: 'ff6e55ac-e49e-4222-b386-0ab1b1294566',
            fiji_water: 3,
            campbell_soup: 3,
            AK47: 1,
            first_aid_pouch: 3,
            owner: '5f6e55ac-e49e-4222-b386-0ab1b1294562',
        },
    ]);
}
