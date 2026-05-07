import axios from "axios"
import axiosInstance from "../axiosInstance"


export const getSections = async () => {
    try{
        const responce = await axiosInstance.get('/sections');
        return responce.data
    }
    catch(err:unknown){
        if(axios.isAxiosError(err)){
            throw new Error('')
        }
    }
}