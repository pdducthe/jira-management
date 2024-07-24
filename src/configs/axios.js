import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT, USER_LOGIN_KEY } from "../constants/common";

//create axios Instance
export const request = axios.create({
    base:BASE_URL,

    headers:{
        TokenCybersoft:TOKEN_CYBERSOFT,
    }
})

//request gui yeu cau len api
request.interceptors.request.use((config)=>{
    let userInfo = localStorage.getItem(USER_LOGIN_KEY);

    if (userInfo){
        userInfo = JSON.parse(userInfo);
       
        config.headers.Authorization = `Bearer ${userInfo?.accessToken}`;
    }
    return config;

});

//response: tra ve api

request.interceptors.response.use((response)=>{
    return response;
})