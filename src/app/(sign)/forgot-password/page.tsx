import { FormForgotPassword } from "@/components/sign/form-forgot-password";
import { DataProvider } from "@/context/reset-password";
import React from "react";

const page = () => {
  return (
    <>
      <DataProvider>
        <FormForgotPassword />
      </DataProvider>
    </>
  );
};

export default page;
