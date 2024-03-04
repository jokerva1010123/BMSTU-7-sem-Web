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
import CreateStudents from "./CreateStudents";
import {
  getlistStudent,
  createStudent,
  getStudentId,
} from "../../store/slices/studentSlide";
import { useDispatch, useSelector } from "react-redux";
import { AppUseDispatch, RootState } from "../../store";
enum ActionKey {
  DELETE = "delete",
}

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.users,
      title: <Link to={webRoutes.users}>Students</Link>,
    },
  ],
};

const Students = () => {
  const actionRef = useRef<ActionType>();
  const [modal, modalContextHolder] = Modal.useModal();
  const dispatch = useDispatch<AppUseDispatch>();
  const getlstStudent = useSelector(
    (state: RootState) => state.student.listStudent
  );
  const [lstStudent, setLstStudent] = useState(getlstStudent);
  useEffect(() => {
    dispatch(getlistStudent());
  }, []);
  useEffect(() => {
    setLstStudent(getlstStudent);
  }, [getlstStudent]);
  const columns: ProColumns[] = [
    {
      title: "ID",
      dataIndex: "id_student",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Student Code",
      dataIndex: "studentCode",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Group Student",
      dataIndex: "groupStudent",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Id Room",
      dataIndex: "id_room",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Id User",
      dataIndex: "id_user",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
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
          subTitle: "Students",
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
          if (params.keyword) {
            dispatch(getStudentId(params.keyword));
          }
        }}
        dateFormatter="string"
        search={false}
        rowKey="id"
        options={{
          search: true,
        }}
        toolBarRender={() => [<CreateStudents />]}
        dataSource={lstStudent ? lstStudent : []}
      />
      {modalContextHolder}
    </BasePageContainer>
  );
};

export default Students;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
