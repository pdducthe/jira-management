import React from 'react'

import { Header, Footer } from '../Organisms/User'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const UserMainLayout = () => {
  return (
    <Container className='MainLayout'>
   
        <Outlet />
 
    </Container>
  )
}

export default UserMainLayout

//styled không hỗ trợ extend hay mixin
const Container = styled.div`
&.MainLayout{
  min-height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
 

  /* .main-content{
    flex:1;
  } */

  
}
`