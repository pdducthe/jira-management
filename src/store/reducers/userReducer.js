import { USER_LOGIN_KEY } from "../../constants/common"
import { GET_USER_LIST, SET_USER_INFO } from "../types/userType"

//localStorage
let userInfo = localStorage.getItem(USER_LOGIN_KEY);

if(userInfo){
    userInfo= JSON.parse(userInfo)
}

const stateDefault = {
    userInfo:userInfo,
    arrUser:[],
}

export const userReducer = (state= stateDefault,{payload,type})=>{
    switch(type){
        case SET_USER_INFO :{
            let data = {...state.userInfo}
            data = payload
            localStorage.setItem(SET_USER_INFO,JSON.stringify(data))
            return {...state,userInfo:data}
        }
        case GET_USER_LIST:{
            let data = {...state.arrUser}
            data = payload
            return{...state,arrUser:data}
        }
        default:return state
    }
}