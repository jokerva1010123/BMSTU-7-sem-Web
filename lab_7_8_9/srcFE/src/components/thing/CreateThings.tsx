import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import { createThing } from "../../store/slices/thingSlide";
import { Student } from "../../interfaces/models/student";
import { useDispatch } from "react-redux";
import { NotificationType, showNotification } from "../../utils";

const CreateThing = () => {
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
        createThing(values, (check) => {
          form.resetFields;
          setLoading(false);
          if (check) {
            showNotification(
              "Success",
              NotificationType.SUCCESS,
              "Thing is added."
            );
            setIsModalOpen(false);
          } else {
            showNotification(
              "Failed",
              NotificationType.ERROR,
              "Thing added fail."
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
        title="Add new thing"
        okText="Submit"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={handleCreate}
        open={isModalOpen}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="codeThing"
            label="Thing's code"
            rules={[
              { required: true, message: "Please enter thing's code" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[
              { required: true, message: "Please enter the thing's type" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateThing;
