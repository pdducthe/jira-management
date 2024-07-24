import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';
import FormLogin from '../../modules/form-login/FormLogin';
import style from './style.scss'

const { Header, Footer, Sider, Content } = Layout;

const Login = () => {
    return (
        <Container className='Login'>
            <Layout>
                <Sider
                    width={window.innerWidth / 2}
                    style=
                    {{
                        height: window.innerHeight,
                        backgroundPosition: 'right',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundImage: "url(./mapletree.jpg)"
                    }}>
                </Sider>
                <Content>
                    <div className='LoginContent' style={{ height: window.innerHeight,
                    }}>
                        <h2 className='mb-5' style={{fontSize:'5vh'}}>LOGIN CYBERBUG</h2>
                        <FormLogin className='FormLogin' ></FormLogin>
                    </div>
                </Content>
            </Layout>
        </Container>
    )
}

export default Login;

const Container = styled.div`
 &.Login{
    .LoginContent{
        padding:3rem;
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:column;
       
    }
    
 }
`