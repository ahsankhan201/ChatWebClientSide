import React, { useState } from "react";
import MainField from "./MainField";
interface Field {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
}
const SignUpFields = () => {
  const [fields, setFields] = useState<{ [key: string]: string }>({});
  const [dynamic, setDynamic] = useState<Field[]>([
    {
      name: "name",
      type: "text",
      label: "UserName",
      placeholder: "Enter UserName",
      required: true,
    },
    {
      name: "email",
      type: "text",
      label: "Email",
      placeholder: "Enter Email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter Password",
      required: true,
    },
  ]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <MainField
        dynamic={dynamic}
        onChange={handleChange}
        onSubmit={handleSubmit}
        title="SignUp Form"
      />
    </>
  );
};

export default SignUpFields;
