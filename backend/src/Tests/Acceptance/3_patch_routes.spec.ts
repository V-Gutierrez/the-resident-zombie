import Server from '../../server';
import { persistentSurvivorUUID } from './utils';

import supertest from 'supertest';
const request = supertest(Server.app);

describe('PATCH routes', () => {
    it('should edit survivor location successfully /api/survivors/:id', async (done) => {
        const response = await request
            .patch(`/api/survivors/${persistentSurvivorUUID}`)
            .send({
                latitude: -23.619814,
                longitude: -46.668463,
            });

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        done();
    });
    it('should throw if location data is not compliant /api/survivors/:id', async (done) => {
        const response = await request
            .patch(`/api/survivors/${persistentSurvivorUUID}`)
            .send({
                latitude: '222222',
                longitude: 22222,
            });

        expect(response.status).toBe(406);
        expect(response.body).toBeDefined();
        done();
    });
});
