
import { backAxiosClient as axios } from '../config/axios';
import { authHeader } from './authHeader.services';

export const getHourlyrate = async() =>{ 
    try{
        const response = await axios.get('/api/hourlyrate', {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.hourlyrates;
    }catch(error){
        return error.response.data
    }
};

export const getHourlyrateById = async(id) =>{ 
    try{
        const response = await axios.post(`/api/hourlyrate/${id}`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.hourlyrate;
    }catch(error){
        return error.response.data
    }
};
