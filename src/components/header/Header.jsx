import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserAction } from "../../store/actions/userAction";
import { USER_LOGIN_KEY } from "../../constants/common";
import { useSelector } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  const [size, setSize] = useState('medium');

  return (
    <div className="w-100 p-2">
      <div className="d-flex justify-content-end align-items-center">
        {
          userInfo ? (
            <div className="d-flex justify-content-center align-items-center">
              <Button  title="Add user" className="mr-2 bg-slate-50" shape="circle" icon={<PlusCircleOutlined />} size={size} />
            </div>
          ) : <span></span>
        }
        <div className="avatar mr-2">

          <img src={userInfo?.avatar} alt={userInfo?.avatar} />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <h5 className="font-weight-bold text-warning m-0 mr-2">
            {userInfo?.name}
          </h5>
          <button
            className="btn btn-outline-danger"
            title="Log out"
            onClick={() => {
              localStorage.removeItem(USER_LOGIN_KEY);
              dispatch(setUserAction(null));
              navigate("/login");
            }}
          >
            <i className="fas fa-sign-out-alt ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header