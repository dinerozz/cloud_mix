import React from "react";
import { LoginLayout } from "@/components/templates/LoginLayout";
import { SignUpForm } from "@/components/organisms/SignUpForm";

export const SignUp = () => {
  return (
    <LoginLayout>
      <SignUpForm />
    </LoginLayout>
  );
};
