import Server from '../../server';

import supertest from 'supertest';
import { errorMessage, generatedSurvivor } from './utils';
const request = supertest(Server.app);

describe('Exception routes', () => {
    it('should return 404 and error message when accessing unknown resource', async (done) => {
        const response = await request.delete('/api/admin');

        expect(response.status).toBe(404);
        expect(response.body).toStrictEqual(errorMessage);
        done();
    });
    it('should return 404 and error message when a non suported method is called in a valid route', async (done) => {
        const response = await request.delete('/api/survivors');

        expect(response.status).toBe(404);
        expect(response.body).toStrictEqual(errorMessage);
        done();
    });
    it('should return 406 when a survivor name is already taken', async (done) => {
        await request.post('/api/survivors').send(generatedSurvivor);

        const exceptionRequest = await request
            .post('/api/survivors')
            .send(generatedSurvivor);

        expect(exceptionRequest.status).toBe(406);
        done();
    });
    it('should return 404 when a  invalid survivor id is called', async (done) => {
        const exceptionRequest = await request.get('/api/survivors/in2vali2d');

        expect(exceptionRequest.status).toBe(404);
        expect(exceptionRequest.body).toStrictEqual({
            message: 'Survivor is not found',
        });
        done();
    });
    it('should return 403 when a survivor creation data is not compliant', async (done) => {
        const exceptionRequest = await request.post('/api/survivors').send({});

        expect(exceptionRequest.status).toBe(403);
        done();
    });
});
