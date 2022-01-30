import axios from 'axios';
import { AppDispatch } from "../store/store";
import { userFetching } from '../store/reducers/UserSlice';
import { IFile } from '../models/IFile';
import { API_URL } from '../config';

export const registration = async (email:string, password:string) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (e:any) {
        alert(e.response.data.message)
    }

}


export const login = (email:string, password: string) => async (dispatch:AppDispatch) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/login`, {
            email,
            password
        })
        dispatch(userFetching(response.data.user))
        localStorage.setItem('token', response.data.token)
    } catch(e: any) {
        alert(e.response.data.message)
    }
}


export const auth = () => async (dispatch:AppDispatch) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/auth/auth`, 
        {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
        dispatch(userFetching(response.data.user));
        localStorage.setItem('token', response.data.token);
    } catch(e: any) {
        localStorage.removeItem('token');
    }
}

export const uploadAvatar = (file: any) => async (dispatch:AppDispatch) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`${API_URL}api/files/avatar`, formData,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(userFetching(response.data))
        } catch (e) {
            console.log(e)
        }
    }


export const deleteAvatar = () => async (dispatch:AppDispatch) => {
        try {
            const response = await axios.delete(`${API_URL}api/files/avatar`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(userFetching(response.data))
        } catch (e) {
            console.log(e)
        }
}

