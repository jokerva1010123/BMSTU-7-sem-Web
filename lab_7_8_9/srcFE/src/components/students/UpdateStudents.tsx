import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { PlusOutlined } from "@ant-design/icons";
const CreateStudents = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      //onCreate(values);
      setLoading(false);
      form.resetFields;
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const showModal = () => {
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
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateStudents;
