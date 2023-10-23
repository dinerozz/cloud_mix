import React from "react";
import { Button, Form, notification, Typography } from "antd";
import FormItem from "antd/lib/form/FormItem";
import Input from "antd/lib/input/Input";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { authApi, TAuthRequest } from "@/api/authApi";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "@/store/authState";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const [, setIsLoggedInState] = useRecoilState(isLoggedInState);

  const signUpMutation = useMutation(
    async (payload: TAuthRequest) => authApi.signUp(payload),
    {
      onSuccess: (res) => {
        localStorage.setItem("AUTH_TOKEN", res.accessToken);
        localStorage.setItem("REFRESH_TOKEN", res.refreshToken);
        setIsLoggedInState(true);
        notification.success({ message: "Success" });
        navigate("/chat");
      },
      onError: () => notification.error({ message: "Something went wrong" }),
    }
  );

  const { isLoading, isError, error, data } = signUpMutation;

  const onFinish = (values: TAuthRequest) => {
    signUpMutation.mutate(values);
  };

  return (
    <Form
      onFinish={onFinish}
      wrapperCol={{ span: 24 }}
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
        <Input placeholder="Enter your username" className="py-3" />
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
      <FormItem
        rules={[{ required: true, message: "Please confirm your password!" }]}
        label={
          <Typography.Text className="text-primaryText">
            Confirm password
          </Typography.Text>
        }
        wrapperCol={{ span: 24 }}
        className="w-full md:w-[85%] lg:w-[80%] xl:w-[75%]"
        name="passwordConfirm"
      >
        <Input
          type="password"
          placeholder="Confirm your password"
          className="py-3"
        />
      </FormItem>
      <Form.Item className="w-full md:w-[85%] lg:w-[80%] xl:w-[75%]">
        <Button
          className="w-full h-[50px] bg-primary duration-300 outline-0 hover:border-0 hover:bg-dark-purple !text-white"
          icon={<LoginOutlined rev={undefined} />}
          htmlType="submit"
          loading={isLoading}
        >
          SignUp
        </Button>
      </Form.Item>

      <Button className="mt-2" type="text" onClick={() => navigate("/login")}>
        Already have account?
      </Button>
    </Form>
  );
};
