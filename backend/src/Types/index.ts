export enum ISurvivorGender {
    Male = 'M',
    Female = 'F',
}
export interface ISurvivor {
    name: string;
    age: number;
    gender: ISurvivorGender;
    latitude: number;
    longitude: number;
}

export interface ISurvivorInventory {
    fiji_water: number;
    campbell_soup: number;
    first_aid_pouch: number;
    AK47: number;
}
