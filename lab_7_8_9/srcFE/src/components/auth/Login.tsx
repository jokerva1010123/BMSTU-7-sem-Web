import { Button, Form, Input } from "antd";
import { Fragment, useEffect, useState } from "react";
import { apiRoutes } from "../../routes/api";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/adminSlice";
import { RootState } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";
import { webRoutes } from "../../routes/web";
import { Admin } from "../../interfaces/models/admin";
import { defaultHttp } from "../../utils/http";
import {
  handleErrorResponse,
  NotificationType,
  showNotification,
  setPageTitle,
} from "../../utils";
interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || webRoutes.students;
  const admin = useSelector((state: RootState) => state.admin);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setPageTitle("Login");
  }, []);

  useEffect(() => {
    if (admin) {
      navigate(from, { replace: true });
    }
  }, [admin]);

  const onSubmit = (values: FormValues) => {
    setLoading(true);

    defaultHttp
      .post(apiRoutes.login, {
        login: values.username,
        password: values.password,
      })
      .then((response) => {
        localStorage.setItem("logiUser", response.data);
        localStorage.setItem("username", values.username);
        const admin: Admin = {
          token: response.data.token,
        };
        dispatch(login(admin));
      })
      .catch((error) => {
        showNotification("Wrong username or password!", NotificationType.ERROR);
        //handleErrorResponse(error);
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-left text-opacity-30  flex justify-center">
        LOGIN
      </h1>
      <Form
        className="space-y-4 md:space-y-6"
        form={form}
        name="login"
        onFinish={onSubmit}
        layout={"vertical"}
        requiredMark={false}
        initialValues={
          import.meta.env.VITE_DEMO_MODE === "true"
            ? {
                email: "alex",
                password: "alex",
              }
            : {}
        }
      >
        <div>
          <Form.Item
            name="username"
            label={
              <p className="block text-sm font-medium text-gray-900">User</p>
            }
            rules={[
              {
                required: true,
                message: "Please enter your user",
              },
            ]}
          >
            <Input className="bg-gray-50 text-gray-900 sm:text-sm py-1.5" />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="password"
            label={
              <p className="block text-sm font-medium text-gray-900">
                Password
              </p>
            }
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password
              visibilityToggle={false}
              className="bg-gray-50 text-gray-900 sm:text-sm py-1.5"
            />
          </Form.Item>
        </div>

        <div className="text-center">
          <Button
            className="mt-4 bg-primary"
            block
            loading={loading}
            type="primary"
            size="large"
            htmlType={"submit"}
          >
            Login
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Login;
