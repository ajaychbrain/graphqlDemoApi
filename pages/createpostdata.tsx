import CreateUserMutation from "@/CreateUserMutation";
import React from "react";
import Header from "./Components/Header/Header";

interface Props {}

const createpostdata = (props: Props) => {
  return (
    <div>
      <Header />

      <CreateUserMutation />
    </div>
  );
};

export default createpostdata;
