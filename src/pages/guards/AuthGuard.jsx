import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthGuard = () => {
    const { userInfo } = useSelector((state) => state.userReducer);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(userInfo)
        if (userInfo===null) {
            navigate("login");
        }
    }, []);

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AuthGuard