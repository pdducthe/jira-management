import {request} from "../configs/axios"
import { BASE_URL } from "../constants/common"
export const fetchUserLogin = (data)=>{
  return request({
    url:`${BASE_URL}/Users/signin`,
    method:"POST",
    data:data,
  })
}

export const fetchUserRegister = (data)=>{
  return request ({
    url:`${BASE_URL}/Users/signup`,
    method:'POST',
    data:data
  })
}

export const getUserListApi = (data)=>{
  return request({
    url:`${BASE_URL}/Users/getUser`,
    method:'GET',
    data:data,
  })
}

export const fetchUpdateUserApi =(userUpdate)=>{
  return request({
    url:`${BASE_URL}/Users/editUser`,
    method:'PUT',
    data:userUpdate,
  })
}

export const fetchDeleteUserApi = (userId)=>{
  return request({
    url:`${BASE_URL}/Users/deleteUser?id=${userId}`,
    method:'DELETE',
  })
}