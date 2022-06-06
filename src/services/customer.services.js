
import { backAxiosClient as axios } from '../config/axios';
import { authHeader } from './authHeader.services';


export const getCustomers = async() =>{
    try{
        const response = await axios.get('/api/customers', {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.customers;
    }catch(error){
        return error.response.data
    }
};

export const getInactivesCustomers = async() =>{
    try{
        const response = await axios.get('/api/customers/inactives', {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.customers;
    }catch(error){
        return error.response.data
    }
};

export const getCustomersById = async(id) =>{
    const response = await axios.post(`/api/customers/${id}`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}});
    return response.data.customer;
};

export const getInactiveCustomersById = async(id) =>{
    const response = await axios.post(`/api/customers/${id}/inactive`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}});
    return response.data.customer;
};

export const postCustomers = async(newCustomer) =>{
    try{
        const response = await axios.post('/api/customers', newCustomer, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data;
    }catch(error){
        return error.response.data
    }
};

export const deleteCustomers = async(id) => {
    try{
        const response = await axios.delete(`/api/customers/${id}`, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data;
    }catch(error){
        return error.response.data
    }
}

export const retrieveCustomer = async(id) => {
    try{
        const response = await axios.put(`/api/customers/${id}/retrieve`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data;
    }catch(error){
        return error.response.data
    }
}

export const updateCustomers = async(id, editedCustomer) =>{ 
    try{
        const response = await axios.put(`/api/customers/${id}`, editedCustomer, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data;
    }catch(error){
        return error.response.data
    }
};
