import React from 'react'
import { Outlet } from 'react-router-dom'
import Menu from '../../components/menu/Menu'
import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'
import { Layout } from 'antd'

const Home = () => {
  const { Sider, Content } = Layout;
  return (
    <div className='jira container-fluid p-0'>
      <Sidebar />
      <Menu />
      <div className="container p-0 m-0">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Header />
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default Home