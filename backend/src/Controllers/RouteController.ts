import { Request, Response } from 'express';
import DatabaseController from './DatabaseController';
import errorHandler from '../Helpers/errorHandler';
import checkForMissingParams from '../Helpers/checkForMissingParams';
import Survivor from '../Models/Survivor';
import Inventory from '../Models/Inventory';

class RouteController {
    async getSurvivors(_: Request, response: Response) {
        try {
            const query = await DatabaseController.getSurvivors();

            response.status(200).json({ survivors: query });
        } catch (error) {
            if (error === 'An error ocurred while querying for survivors') {
                errorHandler(error, response, 500);
            } else {
                errorHandler('Unexpected request', response);
            }
        }
    }

    async createSurvivor(request: Request, response: Response) {
        const {
            name,
            age,
            gender,
            latitude,
            longitude,
            fiji_water,
            campbell_soup,
            first_aid_pouch,
            AK47,
        } = request.body;

        try {
            checkForMissingParams(name, age, gender, latitude, longitude);

            await DatabaseController.createSurvivor(
                new Survivor(name, age, gender, latitude, longitude),
                new Inventory(fiji_water, campbell_soup, first_aid_pouch, AK47)
            );

            response.status(201).json({ message: `${name} was registered` });
        } catch (error) {
            if (error === 'A parameter is missing for this operation') {
                errorHandler(error, response, 403);
            } else if (error.message) {
                errorHandler(
                    'Request data is not compliant to expected or user already exists',
                    response,
                    406
                );
            } else {
                errorHandler(error, response);
            }
        }
    }

    async getSingleSurvivor(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const query = await DatabaseController.getSurvivorById(id);

            response.status(200).json({ result: query });
        } catch (error) {
            if (error === 'Survivor is not found') {
                errorHandler(error, response, 404);
            } else {
                errorHandler(error, response, 400);
            }
        }
    }

    async updateSurvivorLocation(request: Request, response: Response) {
        const { id } = request.params;
        const { latitude, longitude } = request.body;

        try {
            checkForMissingParams(latitude, longitude);

            await DatabaseController.updateSurvivorLocation(
                id,
                latitude,
                longitude
            );

            response.status(200).json({
                message: 'Location updated successfully.',
            });
        } catch (error) {
            if (error === 'A parameter is missing for this operation') {
                errorHandler(error, response, 403);
            } else if (error === 'An error ocurred while updating survivor') {
                errorHandler(error, response, 500);
            } else if (error === 'Survivor is not found') {
                errorHandler(error, response, 404);
            } else {
                errorHandler(error, response, 406);
            }
        }
    }

    async flagSurvivorAsInfected(request: Request, response: Response) {
        const { id } = request.params;

        try {
            await DatabaseController.flagSurvivor(id);

            response.status(201).json({
                message: 'This survivor received a new flag',
            });
        } catch (error) {
            if (error === 'Survivor is already infected') {
                errorHandler(error, response, 406);
            } else {
                errorHandler('ID is invalid', response);
            }
        }
    }

    async getSurvivorItems(request: Request, response: Response) {
        const { id } = request.params;

        try {
            const query = await DatabaseController.getInventoryBySurvivorId(id);

            response.status(200).json({ inventory: query });
        } catch (error) {
            if (error === 'An error ocurred while querying for survivor') {
                errorHandler(error, response, 500);
            } else if (error === 'Survivor is not found') {
                errorHandler(error, response, 404);
            } else {
                errorHandler(error, response);
            }
        }
    }

    async getReports(_: Request, response: Response) {
        try {
            const report = await DatabaseController.getReports();

            response.status(200).json({ reports: report });
        } catch (error) {
            errorHandler(error, response);
        }
    }

    async getHealthyPeople(_: Request, response: Response) {
        try {
            const report = await DatabaseController.parseStatistics(
                'NON-INFECTED_PERCENTAGE'
            );

            response.status(200).json({ reports: report });
        } catch (error) {
            errorHandler(error, response);
        }
    }
    async getInfectedPeople(_: Request, response: Response) {
        try {
            const report = await DatabaseController.parseStatistics(
                'INFECTED_PERCENTAGE'
            );

            response.status(200).json({ reports: report });
        } catch (error) {
            errorHandler(error, response);
        }
    }

    async getItemStats(_: Request, response: Response) {
        try {
            const report = await DatabaseController.parseStatistics(
                'AVERAGE_RESOURCE_PER_SURVIVOR'
            );

            response.status(200).json({ reports: report });
        } catch (error) {
            errorHandler(error, response);
        }
    }

    async middlewareErrorHandle(request: Request, response: Response) {
        const { method } = request;
        response.status(404).json({
            error: `This route is not operable or does not support ${method} method, check documentation in '/api/docs' or https://documenter.getpostman.com/view/11590560/T1LSB5Ma?version=latest`,
        });
    }
}

export default new RouteController();
