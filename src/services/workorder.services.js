
import { backAxiosClient as axios } from '../config/axios';
import { authHeader } from './authHeader.services';

export const getWorkorders = async() =>{ 
    try{
        const response = await axios.get('/api/workorders', {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.workorders;
    }catch(error){
        return error.response.data
    }
};

export const getInactiveWorkorders = async() =>{ 
    try{
        const response = await axios.get('/api/workorders/inactives', {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.workorders;
    }catch(error){
        return error.response.data
    }
};

export const getWorkorderById = async(id)=>{
    try{
        const response = await axios.post(`/api/workorders/${id}`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.workorder;
    }catch(error){
        return error.response.data
    }
}

export const getInactiveWorkorderById = async(id)=>{
    try{
        const response = await axios.post(`/api/workorders/${id}/inactives`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.workorder;
    }catch(error){
        return error.response.data
    }
}


export const getWorkorderByUserId = async(id)=>{
    try{
        const response = await axios.post(`/api/workorders/${id}/user`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.workorders;
    }catch(error){
        return error.response.data
    }
}

export const getWorkorderByProjectId = async(projectId)=>{
    try{
        const response = await axios.post(`/api/workorders/${projectId}/projects`, projectId, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.workorders;
    }catch(error){
        return error.response.data
    }
}

export const getWorkorderByCustomerId = async(customerId)=>{
    try{
        const response = await axios.post(`/api/workorders/${customerId}/customer`, customerId, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data;
    }catch(error){
        return error.response.data
    }
}

export const getWorkorderCountByProjectId = async(projectId)=>{
    try{
        const response = await axios.post(`/api/workorders/${projectId}/projects`, projectId, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.total;
    }catch(error){
        return error.response.data
    }
}

export const getWorkorderMinutesByProjectId = async(projectId)=>{
    try{
        const response = await axios.post(`/api/workorders/${projectId}/projects/minutes`, projectId, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.workorderMinutes;
    }catch(error){
        return error.response.data
    }
}

export const getWorkorderHoursPvpByProjectId = async(projectId)=>{
    try{
        const response = await axios.post(`/api/workorders/${projectId}/projects/minutes/pvp`, projectId, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.workorderPvpMinutesByUser;;
    }catch(error){
        return error.response.data
    }
}

export const getWorkorderMinutesByUserIdAndProjectId = async(projectId)=>{
    try{
        const response = await axios.post(`/api/workorders/${projectId}/projects/minutes/users`, projectId, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.workorderMinutesByUser;
    }catch(error){
        return error.response.data
    }
}

export const postWorkorders = async(newWorkorderAndMaterials) =>{ 
    try{
        const response = await axios.post('/api/workorders', newWorkorderAndMaterials, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data;
    }catch(error){
        return error.response.data
    }
};

export const deleteWorkorders = async(id)=>{
    try{
        const response = await axios.delete(`/api/workorders/${id}`, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data;
    }catch(error){
        return error.response.data
    }
}

export const retrieveWorkorders = async(id) =>{ 
    try{
        const response = await axios.put(`/api/workorders/${id}/retrieve`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data;
    }catch(error){
        return error.response.data
    }
};

export const updateWorkorders = async(id, editedWorkorder) =>{ 
    try{
        const response = await axios.put(`/api/workorders/${id}`, editedWorkorder, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data;
    }catch(error){
        return error.response.data
    }
};
