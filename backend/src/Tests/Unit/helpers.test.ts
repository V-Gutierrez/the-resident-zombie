import bitToBoolean from '../../Helpers/bitToBoolean';
import checkForMissingParams from '../../Helpers/checkForMissingParams';

describe('HELPERS tests', () => {
    test('bitToBoolean should translate numeric values to boolean', () => {
        const value = 1;

        expect(bitToBoolean(value)).toBe(true);
    });
    test('checkForMissingParams should throw when one of it`s arguments is undefined', () => {
        const values = [0, 1, undefined];

        try {
            checkForMissingParams(values[2], values);
        } catch (error) {
            expect(error).toStrictEqual(
                'A parameter is missing for this operation'
            );
        }
    });
});
