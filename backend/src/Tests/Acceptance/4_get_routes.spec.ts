import Server from '../../server';
import {
    persistentSurvivorUUID,
    persistentSurvivorDataModel,
    persistentSurvivorInventory,
} from './utils';

import supertest from 'supertest';
const request = supertest(Server.app);

describe('GET routes', () => {
    it('Should successfully access /api/survivors', async (done) => {
        const response = await request.get('/api/survivors');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        done();
    });
    it('Should successfully access particular survivor endpoint /api/survivors/:id', async (done) => {
        const response = await request.get(
            `/api/survivors/${persistentSurvivorUUID}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty(
            ['result', 0, 'id'],
            persistentSurvivorUUID
        );

        done();
    });
    it('Should successfully access /api/survivors/:id/inventory route and retrive survivor inventory info', async (done) => {
        const response = await request.get(
            `/api/survivors/${persistentSurvivorUUID}/inventory`
        );

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toStrictEqual(persistentSurvivorInventory);
        expect(response.body).toHaveProperty(
            ['inventory', 0, 'owner'],
            persistentSurvivorUUID
        );
        done();
    });
    it('Should successfully access /api/reports', async (done) => {
        const response = await request.get('/api/reports');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        done();
    });
    it('Should successfully access all reports routes', async (done) => {
        const infectedReport = await request.get('/api/reports/infected');
        const healthyReport = await request.get('/api/reports/healthy');
        const itemReport = await request.get('/api/reports/item_stats');

        expect(infectedReport.status).toBe(200);
        expect(healthyReport.status).toBe(200);
        expect(itemReport.status).toBe(200);
        expect(infectedReport.body).toBeDefined();
        expect(healthyReport.body).toBeDefined();
        expect(itemReport.body).toBeDefined();
        done();
    });
});
