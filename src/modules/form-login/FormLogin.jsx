import { LockOutlined, UserOutlined, FacebookFilled, TwitterCircleFilled, InstagramOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { REMEMBER_USER } from '../../store/types/userType';
import { fetchUserLogin } from '../../Services/userServices';
import { USER_LOGIN_KEY } from '../../constants/common';
import { setUserAction } from '../../store/actions/userAction';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values)
    if (values.remember) {
      localStorage.setItem(REMEMBER_USER, JSON.stringify(values));
    }
    else {
      localStorage.removeItem(REMEMBER_USER)
    }
    try {
      const result = await fetchUserLogin(values);
      // const result = await axios({
      //   url: 'https://jiranew.cybersoft.edu.vn/api/Users/signin',
      //   method: 'POST',
      //   headers: {
      //     TokenCyberSoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY'
      //   },
      //   data: values
      // })

      localStorage.setItem(USER_LOGIN_KEY, JSON.stringify(result.data.content));
      dispatch(setUserAction(result.data.content));
      message.success('Đăng nhập thành công');
      navigate('/');
    }
    catch (err) {
      console.log('error', err)
      message.error(err.response.data?.message)
    }
  }

  let rememberUser = localStorage.getItem(REMEMBER_USER);
  if (rememberUser) {
    rememberUser = JSON.parse(rememberUser)
  }

  useEffect(() => {
    if (rememberUser) {
      form.setFieldsValue({
        ...rememberUser,
      })
    }
  }, [rememberUser]);

  return (
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: false,
          email: '',
          passWord: '',
        }}
        onFinish={onFinish}

      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!'
            },
            {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email is invalid",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="passWord"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },

          ]}
        >
          {/* Input.Password để ra cái icon để bật tắt visible cho mật khẩu */}
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button mr-3"
            style={{ width: '100%', height: '2.75rem', fontSize: '1.25rem' }}
          >
            Log in
          </Button>
          <div className='social mt-4 mb-4 flex-row' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '5%', flexWrap: 'wrap', gap: '1rem' }}>
            <Button type="primary" size={"large"} icon={<FacebookFilled />} shape='circle' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} href='https://cybersoft.edu.vn/'>
            </Button>
            <Button type="primary" size={"large"} icon={<TwitterCircleFilled />} style={{ backgroundColor: "cornflowerblue", border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} shape='circle' href='https://cybersoft.edu.vn/'>
            </Button>
            <Button type="primary" size={"large"} icon={<InstagramOutlined />} style={{ backgroundColor: "#ff342e", border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} shape='circle' href='https://cybersoft.edu.vn/'>
            </Button>
          </div>
          <div className='register' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div>
              <span className='mr-3' style={{ fontSize: '1rem' }}>Don't have an account ?</span>
              <a onClick={()=>navigate("/register")} style={{ fontSize: '1rem' }}>Register Now !</a>
            </div>
          </div>
        </Form.Item>
      </Form>
  );
};

export default FormLogin;

