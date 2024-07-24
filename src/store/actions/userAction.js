import axios from 'axios'
import { SET_USER_INFO } from '../types/userType'
import { GET_USER_LIST } from '../types/userType'

export const setUserAction =(values)=> {
    return{
        type:SET_USER_INFO,
        payload:values,
    }
}

export const getUserListAction =(values)=>{
    return{
        type:GET_USER_LIST,
        payload:values,
    }
}

