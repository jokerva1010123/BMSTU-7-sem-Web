import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import { createStudent } from "../../store/slices/studentSlide";
import { Student } from "../../interfaces/models/student";
import { useDispatch } from "react-redux";
import { NotificationType, showNotification } from "../../utils";
import { changeStudentGroup } from "../../store/slices/studentSlide";

const StudentChangeGroup = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const onFinish = (values: any) => {
    console.log(values.userName);
    try {
      let dataUser = localStorage.getItem("logiUser")?.toString();
      if (dataUser == "1") {
        showNotification("Failed", NotificationType.ERROR, "Change Fail.");
        return;
      }
      dispatch(
        changeStudentGroup(values.id, values, (check) => {
          if (check) {
            form.resetFields;
            showNotification(
              "Success",
              NotificationType.SUCCESS,
              "Change Student Group Success"
            );
          } else {
            showNotification("Failed", NotificationType.ERROR, "Change Fail.");
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
          label="Student's code"
          name="id"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="New Name"
          name="name"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="New group"
          name="group"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="New code"
          name="code"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit" onSubmit={onFinish}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default StudentChangeGroup;
