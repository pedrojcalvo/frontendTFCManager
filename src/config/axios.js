
import axios from 'axios';

console.log(process.env.REACT_APP_BACK_URL);

export const backAxiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL,
});
