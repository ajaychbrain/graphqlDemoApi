import TestSingleData from "@/TestSingleData";
import React from "react";
import Header from "./Components/Header/Header";

interface Props {}

const testsingledata = (props: Props) => {
  return (
    <div>
      <Header />
      <TestSingleData />
    </div>
  );
};

export default testsingledata;
