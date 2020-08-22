import Server from '../../server';
import { persistentSurvivorUUID, generatedSurvivor } from './utils';

const supertest = require('supertest');
const request = supertest(Server.app);

describe('POST routes', () => {
    it('Should successfully flag a survivor /api/survivors/:id/flag', async (done) => {
        const response = await request.post(
            `/api/survivors/${persistentSurvivorUUID}/flag`
        );

        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
        done();
    });
    it('Should successfully create a survivor /api/survivors', async (done) => {
        const response = await request
            .post(`/api/survivors`)
            .send(generatedSurvivor);

        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
        done();
    });
});
