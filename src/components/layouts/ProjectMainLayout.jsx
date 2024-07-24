import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Organisms/Project/Header/Header'
import Footer from '../Organisms/Project/Footer/Footer'
import styled from 'styled-components'
const ProjectMainLayout = () => {
  return (
    <Container className='MainLayout'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Container>
  )
}

export default ProjectMainLayout

//styled không hỗ trợ extend hay mixin
const Container = styled.div`
&.MainLayout{
  /* min-height:100vh; */
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  .Header{

  }

  .main-content{
    flex:1;
  }

  .Footer{

  }
}
`