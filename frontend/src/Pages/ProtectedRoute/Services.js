export const runClientAuthCheck = () => {
    try {
        const key = sessionStorage.getItem('personalId').toString();

        return key.match(
            /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i
        )
            ? true
            : false;
    } catch (error) {
        return false;
    }
};
