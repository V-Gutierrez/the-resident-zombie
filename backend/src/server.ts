import express from 'express';
import RouteController from './Controllers/RouteController';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.routes();
    }

    routes() {
        this.app.use(express.json());

        this.app.route('/api/docs').get((_, res) => {
            res.redirect(
                'https://documenter.getpostman.com/view/11590560/T1LSB5Ma?version=latest'
            );
        });

        this.app.route('/api/survivors').get(RouteController.getSurvivors);

        this.app.route('/api/survivors').post(RouteController.createSurvivor);

        this.app
            .route('/api/survivors/:id')
            .get(RouteController.getSingleSurvivor);

        this.app
            .route('/api/survivors/:id')
            .patch(RouteController.updateSurvivorLocation);

        this.app
            .route('/api/survivors/:id/flag')
            .post(RouteController.flagSurvivorAsInfected);

        this.app
            .route('/api/survivors/:id/inventory')
            .get(RouteController.getSurvivorItems);

        this.app.route('/api/reports').get(RouteController.getReports);

        this.app
            .route('/api/reports/healthy')
            .get(RouteController.getHealthyPeople);

        this.app
            .route('/api/reports/infected')
            .get(RouteController.getInfectedPeople);

        this.app
            .route('/api/reports/item_stats')
            .get(RouteController.getItemStats);

        this.app.use(RouteController.middlewareErrorHandle);
    }
}

export default new Server();
