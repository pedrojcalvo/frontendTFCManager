
import { backAxiosClient as axios } from '../config/axios';
import { authHeader } from './authHeader.services';

export const getMaterials = async() =>{ 
    try{
        const response = await axios.get('/api/materials', {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.materials;
    }catch(error){
        return error.response.data
    }
};

export const getInactivesMaterials = async() =>{ 
    try{
        const response = await axios.get('/api/materials/inactives', {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.materials;
    }catch(error){
        return error.response.data
    }
};

export const getMaterialsById = async(id) =>{
    try{
        const response = await axios.post(`/api/materials/${id}`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.material;
    }catch(error){
        return error.response.data
    }
};

export const getInactiveMaterialsById = async(id) =>{
    try{
        const response = await axios.post(`/api/materials/${id}/inactives`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.material;
    }catch(error){
        return error.response.data
    }
};

export const getMaterialByProjectId = async(projectId) =>{
    try{
        const response = await axios.post(`/api/materials/${projectId}/projects`, projectId, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.materialsByProject;
    }catch(error){
        return error.response.data
    }
}

export const getMaterialByWorkorderId = async(workorderId) =>{
    try{
        const response = await axios.post(`/api/materials/${workorderId}/workorders`, workorderId, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.materialByWorkorder;
    }catch(error){
        return error.response.data
    }
}

export const getMaterialTotalPvpByProjectId = async(projectId) =>{
    try{
        const response = await axios.post(`/api/materials/${projectId}/projects/total`, projectId, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.materialsTotalPvpByProject;
    }catch(error){
        return error.response.data
    }
}

export const deleteMaterials = async(id) => {
    try{
        const response = await axios.delete(`/api/materials/${id}`, {headers: {Authorization: 'Bearer ' + await authHeader()}})
        return response.data.customers;
    }catch(error){
        return error.response.data
    }
}

export const postMaterials = async(newMaterial) =>{ 
    try{
        const response = await axios.post('/api/materials', newMaterial, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data;
    }catch(error){
        return error.response.data
    }
};

export const retrieveMaterials = async(id) =>{ 
    try{
        const response = await axios.put(`/api/materials/${id}/retrieve`, id, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.customers;
    }catch(error){
        return error.response.data
    }
};


export const updateMaterials = async(id, editedMaterial) =>{ 
    try{
        const response = await axios.put(`/api/materials/${id}`, editedMaterial, {headers: {Authorization: 'Bearer ' + await authHeader()}});
        return response.data.customers;
    }catch(error){
        return error.response.data
    }
};
