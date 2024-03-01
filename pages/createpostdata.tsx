import CreateUserMutation from "@/CreateUserMutation";
import React from "react";
import Header from "./Components/Header/Header";
import { useFormik } from "formik";

interface Props {}

const createpostdata = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    onSubmit: (values) => {
      // Your form submission logic here
    },
    // Add any other configuration such as validationSchema if needed
  });

  return (
    <div>
      <Header />

      <CreateUserMutation />
    </div>
  );
};

export default createpostdata;
