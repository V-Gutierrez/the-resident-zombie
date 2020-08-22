import knex from 'knex';
import { v4 } from 'uuid';
import * as client from '../../knexfile';
import Survivor from '../Models/Survivor';
import bitToBoolean from '../Helpers/bitToBoolean';

import Inventory from '../Models/Inventory';

class DatabaseController {
    db = knex(client);

    static SURVIVOR_TABLE = 'survivors';
    static INVENTORY_TABLE = 'inventory';

    survivorDataParser(queryResult: Survivor[]) {
        return queryResult.map((survivor: any) => {
            return {
                id: survivor.id,
                survivor: new Survivor(
                    survivor.name,
                    survivor.age,
                    survivor.gender,
                    survivor.latitude,
                    survivor.longitudes
                ),
                infected: bitToBoolean(survivor.infected),
            };
        });
    }

    inventoryDataParser(queryResult: Inventory[], owner: string) {
        return queryResult.map((inventory: any) => {
            return {
                owner,
                inventory: new Inventory(
                    inventory.fiji_water,
                    inventory.campbell_soup,
                    inventory.first_aid_pouch,
                    inventory.AK47
                ),
                fiji_water_value: inventory.fiji_water_value,
                campbell_soup_value: inventory.campbell_soup_value,
                first_aid_pouch_value: inventory.first_aid_pouch_value,
                AK47_value: inventory.AK47_value,
            };
        });
    }

    async parseStatistics(type: string) {
        const totalSurvivors = await this.db.raw(
            `SELECT COUNT(infected) as total FROM ${DatabaseController.SURVIVOR_TABLE}`
        );
        const infectedSurvivors = await this.db.raw(
            `SELECT COUNT(infected) as infected FROM ${DatabaseController.SURVIVOR_TABLE} WHERE infected=1`
        );

        switch (type) {
            case 'INFECTED_PERCENTAGE':
                return {
                    description: 'Average of infected people',
                    infected_percentage:
                        infectedSurvivors[0].infected / totalSurvivors[0].total,
                };

            case 'NON-INFECTED_PERCENTAGE':
                return {
                    description: 'Average of healthy people',
                    healthy_percentage:
                        1 -
                        infectedSurvivors[0].infected / totalSurvivors[0].total,
                };

            case 'AVERAGE_RESOURCE_PER_SURVIVOR':
                try {
                    const stats = await this.db.raw(
                        `SELECT AVG(fiji_water) as "Fiji Water per survivor",
                        AVG(campbell_soup) as "Campbell Soup per survivor",
                        AVG(first_aid_pouch) as "First Aid Pouch per survivor",
                        AVG(AK47) as "AK 47 per survivor" FROM ${DatabaseController.INVENTORY_TABLE}`
                    );
                    const avgItemsQuantity = await this.db
                        .raw(`SELECT AVG(fiji_water + campbell_soup + first_aid_pouch + AK47 ) as "average"
                        FROM ${DatabaseController.INVENTORY_TABLE}`);

                    return {
                        description:
                            'Average of the quantity of items per person (total) and of each item',
                        average_quantity_of_resources_per_person:
                            avgItemsQuantity[0].average,
                        average_of_each_resource_per_survivor: stats[0],
                    };
                } catch (error) {
                    throw error;
                }

            default:
                throw 'This is not a valid use of this function';
        }
    }

    async getSurvivors() {
        try {
            const dbquery = await this.db('survivors').select(
                'id',
                'name',
                'age',
                'gender',
                'latitude',
                'longitude',
                `infected`
            );

            return this.survivorDataParser(dbquery);
        } catch (error) {
            throw 'An error ocurred while querying for survivors';
        }
    }

    async getReports() {
        try {
            return {
                infected_people: `/api/reports/infected`,
                healthy_people: `/api/reports/healthy`,
                item_stats: `/api/reports/item_stats`,
            };
        } catch (error) {
            throw error;
        }
    }

    async getSurvivorById(id: string) {
        try {
            const dbquery = await this.db(DatabaseController.SURVIVOR_TABLE)
                .select(
                    'id',
                    'name',
                    'age',
                    'gender',
                    'latitude',
                    'longitude',
                    `infected`
                )
                .where({ id });

            if (dbquery.length === 0) throw 'Survivor is not found';

            return this.survivorDataParser(dbquery);
        } catch (error) {
            throw error;
        }
    }

    async getInventoryBySurvivorId(id: string) {
        try {
            const dbquery = await this.db(DatabaseController.INVENTORY_TABLE)
                .select('*')
                .where({ owner: id });

            if (dbquery.length === 0) throw 'Survivor is not found';

            return this.inventoryDataParser(dbquery, id);
        } catch (error) {
            throw error;
        }
    }

    async createSurvivor(
        { name, age, gender, latitude, longitude }: Survivor,
        { fiji_water, campbell_soup, first_aid_pouch, AK47 }: Inventory
    ) {
        if (typeof longitude !== 'number' || typeof latitude !== 'number')
            throw 'Latitude and Longitude supposed to be numbers';

        try {
            const userId = v4();

            await this.db(DatabaseController.SURVIVOR_TABLE).insert({
                id: userId,
                name,
                age,
                gender,
                latitude,
                longitude,
            });

            await this.db(DatabaseController.INVENTORY_TABLE).insert({
                id: v4(),
                fiji_water,
                campbell_soup,
                first_aid_pouch,
                AK47,
                owner: userId,
            });
        } catch (error) {
            throw error;
        }
    }

    async updateSurvivorLocation(
        id: string,
        latitude: number,
        longitude: number
    ) {
        if (typeof longitude !== 'number' || typeof latitude !== 'number')
            throw 'Latitude and Longitude supposed to be numbers';

        try {
            await this.getSurvivorById(id);
            await this.db(DatabaseController.SURVIVOR_TABLE)
                .update({ latitude, longitude })
                .where({ id });
        } catch (error) {
            throw error;
        }
    }

    async flagSurvivor(id: string) {
        await this.db(DatabaseController.SURVIVOR_TABLE)
            .update({ infected: 1 })
            .where({ flags: 5 });

        try {
            const userFlags = await this.db(DatabaseController.SURVIVOR_TABLE)
                .select('flags')
                .where({ id });

            if (userFlags[0].flags === 5) throw 'Survivor is already infected';

            await this.db(DatabaseController.SURVIVOR_TABLE)
                .update({ flags: userFlags[0].flags + 1 })
                .where({ id });
        } catch (error) {
            throw error;
        }
    }
}

export default new DatabaseController();
