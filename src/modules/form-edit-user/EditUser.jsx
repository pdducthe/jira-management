import React, { useState } from 'react';
import { PlusOutlined, UserOutlined, KeyOutlined, MailOutlined, PhoneOutlined, IdcardOutlined, } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, message, Row, Select, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchUpdateUserApi, getUserListApi } from '../../Services/userServices';
import { getUserListAction } from '../../store/actions/userAction';

const { Option } = Select;

const EditUser = ({
  isOpenModalModify, setOpenModalModify, setEditUserInfo, editUserInfo
}) => {
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const dispatch = useDispatch();
  const { userEdit } = useSelector((state) => state.userReducer);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    // setOpen(false);
    setOpenModalModify(false)
  };

  const handleSubmit = async (values) => {
    const userUpdate = { ...values, id: editUserInfo.userId.toString() }
    try {
      await
        fetchUpdateUserApi(userUpdate);
      message.success('Sucessful Update !')
      const result = await getUserListApi();
      dispatch(getUserListAction(result.data.content));
      setOpenModalModify(false)
    } catch (err) {
      message.error(err.response.data.content)
    }
  }

  //validation


  console.log(editUserInfo)
  return (
    <>
      <Drawer
        title="Edit User Information"
        width={window.innerWidth / 2}
        onClose={onClose}
        open={isOpenModalModify}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical" hideRequiredMark
          width={window.innerWidth / 2}
          form={form}
          onFinish={(values) => handleSubmit(values)}
          initialValues={{
            email: editUserInfo.email,
            passWord: editUserInfo.passWord,
            name: editUserInfo.name,
            phoneNumber: editUserInfo.phoneNumber,
            userId: editUserInfo.userId,
            avatar: editUserInfo.avatar,
          }}
        >
          <Form.Item
            label="User ID"
            name="userId"
            validateTrigger={["onChange"]}
            rules={[
              {
                required: true,
                message: "Please input your userId!",
              },
            ]}
          >
            <Input
              size="large"
              style={{ minWidth: 350 }}
              prefix={<IdcardOutlined />}
              disabled
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            validateTrigger={["onChange"]}
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email is invalid",
              },
            ]}
          >
            <Input
              size="large"
              style={{ minWidth: 350 }}
              prefix={<MailOutlined />}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="passWord"
            validateTrigger={["onChange"]}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              size="large"
              style={{ minWidth: 350 }}
              prefix={<KeyOutlined />}
            />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            validateTrigger={["onChange"]}
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
              {
                pattern:
                  "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                  "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                  "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
                message: "Name is invalid",
              },
            ]}
          >
            <Input
              size="large"
              style={{ minWidth: 350 }}
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phoneNumber"
            validateTrigger={["onChange"]}
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                message: 'Phone Number is invalid !'
              },
              {
                min: 10, max: 12, message: 'Phone Number must be between 10 and 12 numbers.'
              },
            ]}
          >
            <Input
              size="large"
              style={{ minWidth: 350 }}
              prefix={<PhoneOutlined />}
            />
          </Form.Item>
          <Form.Item
            name='Avatar'
            label='Avatar'
            valuePropName='fileList'
          >
            <img src={`https://ui-avatars.com/api/?name=${editUserInfo.name}`}>

            </img>
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => {
              return (
                <Button
                  style={{ backgroundColor: "#065fd4", color: "white" }}
                  htmlType="submit"
                  block
                  disabled={
                    !form.isFieldsTouched() ||
                    form.getFieldsError().some((ele) => ele.errors.length > 0)
                  }
                >
                  Update user
                </Button>
              );
            }}
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default EditUser;