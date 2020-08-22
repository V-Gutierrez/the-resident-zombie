import { ISurvivor, ISurvivorGender } from '../Types/index';

class Survivor implements ISurvivor {
    constructor(
        public name: string,
        public age: number,
        public gender: ISurvivorGender,
        public latitude: number = 0,
        public longitude: number = 0
    ) {
        return this;
    }
}

export default Survivor;
