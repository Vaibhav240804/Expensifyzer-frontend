import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/user/`

export const register = async (user) => {
    const response = await axios.post(API_URL,user)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data;
}


export const login = async (user) => {
    const response = await axios.post(`${API_URL}login`,user)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data;
}
