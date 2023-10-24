import React, { useContext } from "react";
import { Button, Form, notification, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import Input from "antd/lib/input/Input";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { authApi, TAuthRequest } from "@/api/authApi";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "@/store/authState";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [, setIsLoggedInState] = useRecoilState(isLoggedInState);

  const loginMutation = useMutation(
    async (payload: TAuthRequest) => authApi.login(payload),
    {
      onSuccess: (res) => {
        localStorage.setItem("IS_LOGGED_IN", "true");
        notification.success({ message: "Success" });
        navigate("/chat");
      },
      onError: () => notification.error({ message: "Something went wrong" }),
    }
  );

  const onFinish = (values: TAuthRequest) => {
    loginMutation.mutate(values);
  };

  const { isLoading } = loginMutation;

  return (
    <Form
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
      autoComplete="off"
      className="w-full flex items-center justify-center flex-col"
      layout="vertical"
    >
      <FormItem
        rules={[{ required: true, message: "Please input your username!" }]}
        label={
          <Typography.Text className="text-primaryText">
            Username
          </Typography.Text>
        }
        wrapperCol={{ span: 24 }}
        name="username"
        className="w-full md:w-[85%] lg:w-[80%] xl:w-[75%]"
      >
        <Input type="text" placeholder="Enter your username" className="py-3" />
      </FormItem>
      <FormItem
        rules={[{ required: true, message: "Please input your password!" }]}
        label={
          <Typography.Text className="text-primaryText">
            Password
          </Typography.Text>
        }
        name="password"
        wrapperCol={{ span: 24 }}
        className="w-full md:w-[85%] lg:w-[80%] xl:w-[75%]"
      >
        <Input
          type="password"
          placeholder="Enter your password"
          className="py-3"
        />
      </FormItem>
      <Form.Item className="w-full md:w-[85%] lg:w-[80%] xl:w-[75%]">
        <Button
          className="w-full h-[50px] bg-primary duration-300 outline-0 hover:border-0 hover:bg-dark-purple !text-white"
          icon={<LoginOutlined rev={undefined} />}
          loading={isLoading}
          htmlType="submit"
        >
          Login
        </Button>
      </Form.Item>
      <Button className="mt-2" type="text" onClick={() => navigate("/")}>
        Doesn't have account?
      </Button>
    </Form>
  );
};
