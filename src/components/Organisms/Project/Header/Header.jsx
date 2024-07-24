import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, message, Space } from 'antd';

const Header = () => {

    return (
        <Container className="container mx-auto Login">
            <p>PROJECT HEADER</p>
        </Container>
    )
}

export default Header

const Container = styled.div`
    &.Login{
        .LoginUser{
            display:flex;
            align-items:center;
            justify-content:flex-end
        }
    }
`