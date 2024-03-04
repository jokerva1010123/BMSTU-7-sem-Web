import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import { createStudent } from "../../store/slices/studentSlide";
import { Student } from "../../interfaces/models/student";
import { useDispatch } from "react-redux";
import { NotificationType, showNotification } from "../../utils";

const CreateStudents = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const handleCreate = async () => {
    try {
      let dataUser = localStorage.getItem("logiUser")?.toString();
      if (dataUser == "1") {
        showNotification("Failed", NotificationType.ERROR, "Change Fail.");
        return;
      }
      const values = await form.validateFields();
      setLoading(true);
      dispatch(
        createStudent(values, (check) => {
          form.resetFields;
          setLoading(false);
          if (check) {
            showNotification(
              "Success",
              NotificationType.SUCCESS,
              "Student is created."
            );
            setIsModalOpen(false);
          } else {
            showNotification(
              "Failed",
              NotificationType.ERROR,
              "Student created fail."
            );
          }
        })
      );
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const showModal = () => {
    form.resetFields;
    setIsModalOpen(true);
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button
        id="btn-outline"
        key="button"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Create
      </Button>
      <Modal
        title="Create Student"
        okText="Submit"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={handleCreate}
        open={isModalOpen}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="login"
            label="Login"
            rules={[{ required: true, message: "Please enter the login" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter the password" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nameStudent"
            label="NameStudent"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="groupStudent"
            label="GroupStudent"
            rules={[
              { required: true, message: "Please enter the GroupStudent" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="codeStudent"
            label="CodeStudent"
            rules={[
              { required: true, message: "Please enter the codeStudent" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateStudents;
