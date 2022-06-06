
import { backAxiosClient as axios } from '../config/axios';
import { authHeader } from './authHeader.services';

export const getUsers = async() =>{ 
    const response = await axios.get('/api/users', {headers: {Authorization: 'Bearer ' + await authHeader()}});
    return response.data.users;
};

export const getInactivesUsers = async() =>{ 
    const response = await axios.get('/api/users/inactives', {headers: {Authorization: 'Bearer ' + await authHeader()}});
    return response.data.users;
};

export const getUserById= async(id) =>{ 
    const response = await axios.post(`/api/users/${id}`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}});
    return response.data.user;
};

export const getInactiveUserById= async(id) =>{ 
    const response = await axios.post(`/api/users/${id}/inactive`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}});
    return response.data.user;
};

export const deleteUsers = async(id) => {
    await axios.delete(`/api/users/${id}`, {headers: {Authorization: 'Bearer ' + await authHeader()}})
};

export const postUsers = async(newUser) =>{ 
    try{
        const response = await axios.post('/api/users', newUser, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data
    }catch(error){
        return error.response.data
    }
};

export const retrieveUsers = async(id) =>{ 
    try{
        const response = await axios.put(`/api/users/${id}/retrieve`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data
    }catch(error){
        return error.response.data
    }
};

export const updateUsers = async(id, editedUser) =>{ 
    try{
        const response = await axios.put(`/api/users/${id}`, editedUser, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data
    }catch(error){
        return error.response.data
    }
};
