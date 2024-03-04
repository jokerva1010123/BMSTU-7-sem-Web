import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  TableDropdown,
  ProDescriptions,
  EditableProTable,
} from "@ant-design/pro-components";
import { PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  BreadcrumbProps,
  Modal,
  Space,
  Button,
  Form,
  Input,
  Tag,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { CiCircleMore } from "react-icons/ci";
import { Link } from "react-router-dom";
import { User } from "../../interfaces/models/user";
import { apiRoutes } from "../../routes/api";
import { webRoutes } from "../../routes/web";
import {
  handleErrorResponse,
  NotificationType,
  showNotification,
} from "../../utils";
import http from "../../utils/http";
import BasePageContainer from "../layout/PageContainer";
import LazyImage from "../lazy-image";
import Icon, {
  ExclamationCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { getlistRoom } from "../../store/slices/roomSlide";
import { useDispatch, useSelector } from "react-redux";
import { AppUseDispatch, RootState } from "../../store";
enum ActionKey {
  DELETE = "delete",
}
const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.users,
      title: <Link to={webRoutes.users}>Room</Link>,
    },
  ],
};

const Room = () => {
  const actionRef = useRef<ActionType>();
  const [modal, modalContextHolder] = Modal.useModal();
  const dispatch = useDispatch<AppUseDispatch>();
  const getlstRoom = useSelector((state: RootState) => state.room.listRoom);
  const [lstRoom, setlstRoom] = useState(getlstRoom);
  useEffect(() => {
    dispatch(getlistRoom());
  }, []);
  useEffect(() => {
    setlstRoom(getlstRoom);
  }, [getlstRoom]);
  const columns: ProColumns[] = [
    {
      title: "ID",
      dataIndex: "id_room",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Number",
      dataIndex: "number",
      sorter: true,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Room Type",
      dataIndex: "roomtype",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    // {
    //   title: "Action",
    //   align: "center",
    //   key: "option",
    //   fixed: "right",
    //   render: (_, row: User) => [
    //     <TableDropdown
    //       key="actionGroup"
    //       onSelect={(key) => handleActionOnSelect(key, row)}
    //       menus={[
    //         {
    //           key: ActionKey.DELETE,
    //           name: (
    //             <Space>
    //               <DeleteOutlined />
    //               Delete
    //             </Space>
    //           ),
    //         },
    //       ]}
    //     >
    //       <Icon component={CiCircleMore} className="text-primary text-xl" />
    //     </TableDropdown>,
    //   ],
    // },
  ];

  const handleActionOnSelect = (key: string, user: User) => {
    if (key === ActionKey.DELETE) {
      showDeleteConfirmation(user);
    }
  };

  const showDeleteConfirmation = (user: User) => {
    modal.confirm({
      title: "Are you sure to delete this user?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <ProDescriptions column={1} title=" ">
          <ProDescriptions.Item valueType="avatar" label="Avatar">
            {user.avatar}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" label="Name">
            {user.first_name} {user.last_name}
          </ProDescriptions.Item>
          <ProDescriptions.Item valueType="text" label="Email">
            {user.email}
          </ProDescriptions.Item>
        </ProDescriptions>
      ),
      okButtonProps: {
        className: "bg-primary",
      },
      onOk: () => {
        return http
          .delete(`${apiRoutes.Students}/${user.id}`)
          .then(() => {
            showNotification(
              "Success",
              NotificationType.SUCCESS,
              "User is deleted."
            );

            actionRef.current?.reloadAndRest?.();
          })
          .catch((error) => {
            handleErrorResponse(error);
          });
      },
    });
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          subTitle: "Room",
          tooltip: {
            className: "opacity-60",
            title: "Mocked data",
          },
          title: <FiUsers className="opacity-60" />,
        }}
        bordered={true}
        showSorterTooltip={false}
        scroll={{ x: true }}
        tableLayout={"fixed"}
        rowSelection={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
        }}
        actionRef={actionRef}
        request={(params) => {
          return http
            .get(apiRoutes.Students, {
              params: {
                page: params.current,
                per_page: params.pageSize,
              },
            })
            .then((response) => {
              const users: [User] = response.data.data;

              return {
                data: users,
                success: true,
                total: response.data.total,
              } as RequestData<User>;
            })
            .catch((error) => {
              handleErrorResponse(error);

              return {
                data: [],
                success: false,
              } as RequestData<User>;
            });
        }}
        dateFormatter="string"
        search={false}
        rowKey="id"
        options={{
          search: true,
        }}
        dataSource={lstRoom ? lstRoom : []}
      />
      {modalContextHolder}
    </BasePageContainer>
  );
};

export default Room;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
