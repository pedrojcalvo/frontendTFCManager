
import { backAxiosClient as axios } from '../config/axios';
import { authHeader } from './authHeader.services';

export const getProjects = async() =>{ 
    try{
        const response = await axios.get('/api/projects', {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.users;
    }catch(error){
        return error.response.data
    }
};

export const getInactiveProjects = async() =>{ 
    try{
        const response = await axios.get('/api/projects/inactives', {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.users;
    }catch(error){
        return error.response.data
    }
};

export const getProjectsByCustomer = async(id) =>{
    try{
        const response = await axios.post(`/api/customers/${id}/projects`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.projects;
    }catch(error){
        return error.response.data
    }
};

export const getProjectsByCustomerCount = async(customerId) =>{
    try{
        const response = await axios.post(`/api/customers/${customerId}/projects`, customerId, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.total;
    }catch(error){
        return error.response.data
    }
};

export const getInactiveProjectsByCustomerCount = async(id) =>{
    try{
        const response = await axios.post(`/api/customers/${id}/projects/inactive`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.total;
    }catch(error){
        return error.response.data
    }
};

export const getInactiveProjectsByCustomer = async(id) =>{
    try{
        const response = await axios.post(`/api/customers/${id}/projects/inactive`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.projects;
    }catch(error){
        return error.response.data
    }
};

export const getProjectsByUser = async(id) =>{
    try{
        const response = await axios.post(`/api/users/${id}/projects`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.projects;
    }catch(error){
        return error.response.data
    }
};

export const getProjectById = async(id)=>{
    try{
        const response = await axios.post(`/api/projects/${id}`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.project;
    }catch(error){
        return error.response.data
    }
};

export const getInactiveProjectById = async(id)=>{
    try{
        const response = await axios.post(`/api/projects/${id}/inactive`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.project;
    }catch(error){
        return error.response.data
    }
};

export const deleteProjects = async(id)=>{
    try{
        const response = await axios.delete(`/api/projects/${id}`, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data;
    }catch(error){
        return error.response.data
    }
};

export const postProjects = async(newProject) =>{ 
    try{
        const response = await axios.post('/api/projects', newProject, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data;
    }catch(error){
        return error.response.data
    }
};

export const retrieveProjects = async(id) =>{ 
    try{
        const response = await axios.put(`/api/projects/${id}/retrieve`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data;
    }catch(error){
        return error.response.data
    }
};

export const updateProjects = async(id, editedProject) =>{ 
    try{
        const response = await axios.put(`/api/projects/${id}`, editedProject, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data;
    }catch(error){
        return error.response.data
    }
};
