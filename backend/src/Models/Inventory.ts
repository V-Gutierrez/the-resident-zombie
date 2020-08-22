import { ISurvivorInventory } from '../Types/index';

class Inventory implements ISurvivorInventory {
    constructor(
        public fiji_water: number = 0,
        public campbell_soup: number = 0,
        public first_aid_pouch: number = 0,
        public AK47: number = 0
    ) {
        return this;
    }
}

export default Inventory;
