
import { backAxiosClient as axios } from '../config/axios';
import { authHeader } from './authHeader.services';

export const postWorkorders_materials = async(materials) =>{ 
    try{
        const response = await axios.post('/api/workorder_materials', materials, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data;
    }catch(error){
        return error.response.data
    }
};
