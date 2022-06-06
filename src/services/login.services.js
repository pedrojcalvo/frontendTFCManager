
import { backAxiosClient as axios } from '../config/axios';

export const userLogin = async(user_email, user_password) =>{ 
    try{
        const response = await axios.post('/api/auth', {user_email, user_password});
        if(response.data.token){
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    }catch(error){
        return error.response.data
    }
};

export const getUserData = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export const closeSession = () => {
    localStorage.removeItem("user");
}
