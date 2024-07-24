import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const NoAuthGuard = () => {
    const { userInfo } = useSelector((state) => state.userReducer)
    const navigate = useNavigate();
    useEffect(() => {
        if (userInfo) {
            navigate("");
        }
    },[])
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default NoAuthGuard