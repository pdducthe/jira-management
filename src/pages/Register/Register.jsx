import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';
import FormRegister from '../../modules/form-register/FormRegister';

const { Header, Footer, Sider, Content } = Layout;

const Register = () => {
    return (
        <Container className='Register container-fluid p-0'>
            <Layout>
                <Sider
                className='container-fluid p-0'
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
                    <div className='RegisterContent' style={{ height: window.innerHeight,
                    }}>
                        <h2 className='mb-5' style={{fontSize:'5vh'}}>REGISTER CYBERBUG</h2>
                        <FormRegister className='FormRegister h-screen' ></FormRegister>
                    </div>
                </Content>
            </Layout>
        </Container>
    )
}

export default Register;

const Container = styled.div`
 &.Register{
    .RegisterContent{
        padding:3rem;
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:column;
       
    }
    
 }
`