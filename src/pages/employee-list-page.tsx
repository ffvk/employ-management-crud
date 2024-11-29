import React from "react";
import Header from "../components/header";
import EmployeeList from "../components/employee-list";

const EmployeeListPage: React.FC = () => {
  return (
    <>
      <Header />
      <EmployeeList />
    </>
  );
};

export default EmployeeListPage;
