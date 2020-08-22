import axios from 'axios';

const trzApi = axios.create({
    baseURL: ' http://zssn-backend-example.herokuapp.com/api',
});

export default trzApi;
