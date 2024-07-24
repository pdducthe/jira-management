import React from 'react'
import { lazy } from "react";
import { Navigate, useRoutes } from 'react-router-dom'
import Register from '../pages/Register/Register';
const UserMainLayout = lazy(() => import("../components/layouts/UserMainLayout"))
// import UserMainLayout from '../components/layouts/UserMainLayout'
const ProjectMainLayout = lazy(() => import("../components/layouts/ProjectMainLayout"))
// import ProjectMainLayout from '../components/layouts/ProjectMainLayout'
const UserManagement = lazy(() => import("../pages/User/UserManagement"))
// import UserManagement from '../pages/User/UserManagement'
const Home = lazy(() => import("../pages/Home/Home"))
// import Home from '../pages/Home/Home'
const Login = lazy(() => import("../pages/Login/Login"))
// import Login from '../pages/Login/Login'
const ProjectManagement = lazy(() => import("../pages/Project/ProjectManagement"))
// import ProjectManagement from '../pages/Project/ProjectManagement'
const NoAuthGuard = lazy(() => import("../pages/guards/NoAuthGuard"))
// import NoAuthGuard from '../pages/guards/NoAuthGuard'
const AuthGuard = lazy(() => import("../pages/guards/AuthGuard"))
// import AuthGuard from '../pages/guards/AuthGuard'
const UserManagment = lazy(()=>import("../../src/pages/User/UserManagement"))
const Routers = () => {
  //useRoutes nhận vào 1 mảng
  const routing = useRoutes([
    {
      path: '',
      element: <AuthGuard />,
      children: [
        {
          path: '',
          element: <Home />,
          children: [
            {
              path:'userManagement',
              element:<UserManagment/>,
            },
          
          ]
        }
      ]
    },
    {
      path: '',
      element: <NoAuthGuard />,
      children: [
   
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Register />,
        }
      ]
    }
  ])

  return routing

}

export default Routers