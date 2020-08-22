export const dreamWorkLat = -23.619814;
export const dreamWorkLng = 46.668463;

export const latlongParser = (lonlat) => {
    try {
        const parsed = lonlat
            .replace('POINT', '')
            .replace('(', '')
            .replace(')', '')
            .split(' ')
            .filter((item) => item !== '')
            .map((item) => Number(item));

        return [parsed[1], parsed[0]];
    } catch (error) {
        return [0, 0];
    }
};

export const idParserFromUrl = (location) => {
    const idParser = location.split('/');

    return idParser[idParser.length - 1];
};

export const safetyModifier = 0.09;
