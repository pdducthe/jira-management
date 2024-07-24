import {
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    DownloadOutlined
} from "@ant-design/icons";
import { Button, Input, message, notification, Space, Table, Popconfirm } from "antd";
import React, { useContext, useEffect, useRef, useState, Fragment } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
    fetchDeleteUserApi,
    // fetchDeleteUserApi, 
    getUserListApi
} from "../../Services/userServices";
import {
    getUserListAction,
    // setUserEditAction,
} from "../../store/actions/userAction";
import { LoadingContext } from "../../contexts/LoadingContext";
import "./table-user-management.scss";
import FormEditUser from "../form-edit-user/FormEditUser";
import EditUser from "../form-edit-user/EditUser";

//   import { openFormEditUserAction } from "../../store/actions/modalEditAction";

const TableUserManagement = () => {

    const dispatch = useDispatch();

    const { arrUser } = useSelector((state) => state.userReducer);
    const [editUserInfo, setEditUserInfo] = useState({});
    const [isOpenModalModify, setOpenModalModify] = useState(false);
    const [size, setSize] = useState('small'); // default is 'middle'

    // console.log('arrUser', arrUser)
    const [loadingState, setLoadingState] = useState({
        loading: false,
        setLoading: null,
    })

    useEffect(() => {
        fetchGetUserList();
    }, []);
    useEffect(() => {
        console.log(isOpenModalModify)
    }, [isOpenModalModify])

    const fetchGetUserList = async () => {
        setLoadingState({ loading: true });
        const result = await getUserListApi();
        setLoadingState({ isLoading: false });
        dispatch(getUserListAction(result.data.content));
    };

    const [searchText, setSearchText] = useState("");

    const [searchedColumn, setSearchedColumn] = useState("");

    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };



    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);

        // this.setState({
        //   filteredInfo: filters,
        //   sortedInfo: sorter,
        // });
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters &&
                                handleReset(clearFilters)
                        }}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1890ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    //confirm delete antd
    const confirm = (item) => {
        fetchDeleteUser(item)
    };
    //confirm cancel antd
    const cancel = () => {
        // message.error('Click on No');
    };

    const fetchDeleteUser = async (userId) => {

        console.log(userId)
        try {
            await fetchDeleteUserApi(userId.userId);
            message.success('Sucessful Delete')
            fetchGetUserList();
        } catch (err) {
            message.error(err.response.data.content)
        }
    };

    // const fetchUserEdit = (userId) => {
    //   const arrUserEdit = [...arrUser];
    //   const index = arrUserEdit.findIndex((user) => userId === user.userId);
    //   dispatch(setUserEditAction(arrUserEdit[index]));
    // };

    //filter and sort function

    const columns = [
        {
            title: "ID & Name",
            render: (record) => (
                <React.Fragment>
                    {record.userId}
                    <br />
                    {record.name}
                </React.Fragment>
            ),
            responsive: ["xs"],
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            // width: 100,
            align: 'center',
            ellipsis: true,
            render: (text, userInfo) => {
                return <Fragment>
                    <img src={userInfo.avatar} alt={userInfo.name} width={25} height={25}
                        onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photo/id/${userInfo.name}/50/50` }} />
                </Fragment>
            }
        },
        {
            title: "ID",
            dataIndex: "userId",
            key: "userId",
            align: 'center',
            sortDirections: ["descend"],
            sorter: (item2, item1) => item2.userId - item1.userId,
            responsive: ["sm"],
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
            sortDirections: ["descend"],
            sorter: (item2, item1) => {
                let name1 = item1.name?.trim().toLowerCase();
                let name2 = item2.name?.trim().toLowerCase();
                if (name2 < name1) {
                    return -1;
                } else {
                    return 1;
                }
            },
            responsive: ["sm"],
        },
        {
            title: "Email & Phone",
            align: 'center',
            render: (record) => (
                <React.Fragment>
                    {record.email}
                    <br />
                    {record.phoneNumber}
                </React.Fragment>
            ),
            responsive: ["xs"],
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email"),
            sortDirections: ["descend"],
            sorter: (item2, item1) => {
                let email1 = item1.email?.trim().toLowerCase();
                let email2 = item2.email?.trim().toLowerCase();
                if (email1 < email2) {
                    return -1;
                } else {
                    return 1;
                }
            },
            responsive: ["sm"],
        },
        {
            title: "Phone number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            responsive: ["sm"],
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, item) => (
                <Space size="middle">
                    <a
                        title="Edit"
                        className="text-success"
                        style={{ fontSize: 20 }}
                        onClick={() => {
                            setOpenModalModify(true)
                            setEditUserInfo(item)
                            // dispatch(openFormEditUserAction());
                            // fetchUserEdit(record.userId);
                        }}
                    >
                        <EditOutlined />
                    </a>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => confirm(item)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a
                            href="#"
                            title="Delete"
                            className="text-danger"
                            style={{ fontSize: 20 }}
                            onClick={() => {
                                // fetchDeleteUser(item)
                            }
                            }
                        >
                            <DeleteOutlined />
                        </a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <div className="text-center TableUserManagement">
           
            <h3 className="font-weight-bold mb-4">User Management</h3>

            <Table
                className="table"
                rowKey={"userId"}
                columns={columns}
                dataSource={arrUser}
                onChange={handleChange}
            />
            {isOpenModalModify && (
                <EditUser isOpenModalModify={isOpenModalModify}
                    setOpenModalModify={setOpenModalModify}
                    setEditUserInfo={setEditUserInfo}
                    editUserInfo={editUserInfo}
                />
            )}
        </div>
    );
}

export default TableUserManagement