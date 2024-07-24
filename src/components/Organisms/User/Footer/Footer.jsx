import React from 'react'
import './style.scss'
import styled from 'styled-components'

export const Footer = () => {
  return (
    <div className='Footer'>
      <p>User Footer</p>
    </div>
  )
}

export default Footer

const Container = styled.div`
  &.Footer{
    
  }
`