import DatabaseController from '../../Controllers/DatabaseController';

describe('Database Controller READ methods test', () => {
    test('Database controller parseStatistics method should throw when parameters does not comply', async () => {
        try {
            await DatabaseController.parseStatistics('INFECTED_PERCENTAsGE');
        } catch (error) {
            expect(error).toStrictEqual(
                'This is not a valid use of this function'
            );
        }
    });
    test('Database controller parseStatistics method should NOT throw when parameters comply', async () => {
        const testCase = await DatabaseController.parseStatistics(
            'INFECTED_PERCENTAGE'
        );

        expect(testCase).toBeDefined();
    });
    test('Database controller getSurvivors method should return defined value', async () => {
        const testCase = await DatabaseController.getSurvivors();

        expect(testCase).toBeDefined();
    });
    test('Database controller getReports method should return defined value', async () => {
        const testCase = await DatabaseController.getReports();

        expect(testCase).toBeDefined();
    });
});
