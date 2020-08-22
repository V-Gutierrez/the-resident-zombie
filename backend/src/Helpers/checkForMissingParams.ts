const checkForMissingParams = (...args: any) => {
    for (const item of args) {
        if (!item) {
            throw `A parameter is missing for this operation`;
        }
    }
};

export default checkForMissingParams;
