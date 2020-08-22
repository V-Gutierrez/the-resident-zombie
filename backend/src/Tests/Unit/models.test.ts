import Inventory from '../../Models/Inventory';
import Survivor from '../../Models/Survivor';
import { ISurvivorGender } from '../../Types';

describe('Models test', () => {
    test('Survivor should return expected implementation', () => {
        const testCase = new Survivor('Tester', 22, ISurvivorGender.Male);

        expect(testCase).toEqual({
            name: 'Tester',
            age: 22,
            gender: 'M',
            latitude: 0,
            longitude: 0,
        });
        expect(testCase).toBeInstanceOf(Survivor);
    });
    test('Inventory should return expected implementation', () => {
        const testCase = new Inventory(1, 2, 3);

        expect(testCase).toEqual({
            fiji_water: 1,
            campbell_soup: 2,
            first_aid_pouch: 3,
            AK47: 0,
        });
        expect(testCase).toBeInstanceOf(Inventory);
    });
});
