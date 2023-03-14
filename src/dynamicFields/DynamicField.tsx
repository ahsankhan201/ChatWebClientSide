import React, { useState } from "react";
import MainField from "./MainField";

interface Field {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  className?: string;
}

const DynamicField = () => {
  const [fields, setFields] = useState<{ [key: string]: string }>({});
  const [dynamic, setDynamic] = useState<Field[]>([
    {
      name: "name",
      type: "text",
      label: "UserName",
      placeholder: "Enter UserName",
      required: true,
      className: "name_style",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter Password",
      required: true,
      className: "password_style",
    },
    {
      name: "gender",
      type: "checkbox",
      label: "Are you sure you want to continue?",
      placeholder: "Select Option",
      required: true,
      className: "password_style",
    },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <MainField
        dynamic={dynamic}
        onChange={handleChange}
        onSubmit={handleSubmit}
        title="Login Form"
      />
    </div>
  );
};

export default DynamicField;
