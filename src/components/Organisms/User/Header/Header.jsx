import React from 'react'
import './style.scss'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='Header'>
      <p>User Header</p>
    </div>
  )
}

export default Header

const Container = styled.div`
    &.Header{

    }
`