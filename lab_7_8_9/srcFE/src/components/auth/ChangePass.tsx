import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import { createStudent } from "../../store/slices/studentSlide";
import { Student } from "../../interfaces/models/student";
import { useDispatch } from "react-redux";
import { NotificationType, showNotification } from "../../utils";
import { changePass } from "../../store/slices/adminSlice";

export const ChangePass = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const onFinish = (values: any) => {
    let dataUser = localStorage.getItem("username")?.toString();
    try {
      dispatch(
        changePass(dataUser, values, (check) => {
          if (check) {
            form.resetFields;
            showNotification(
              "Success",
              NotificationType.SUCCESS,
              "Change Password Success"
            );
          } else {
            showNotification(
              "Failed",
              NotificationType.ERROR,
              "Change Password Fail."
            );
          }
        })
      );
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >

        <Form.Item
          label="Old Pass"
          name="oldPass"
          rules={[{ required: true, message: "Please input!" }]}
        >
          {/* <Input.TextArea /> */}
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New Pass"
          name="newPass"
          rules={[{ required: true, message: "Please input!" }]}
        >
          {/* <Input.TextArea /> */}
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New Repeat Pass"
          name="newRepeatPass"
          rules={[{ required: true, message: "Please input!" }]}
        >
          {/* <Input.TextArea /> */}
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="default" htmlType="submit" onSubmit={onFinish}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangePass;
