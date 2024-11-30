import React from "react";
import { Employee } from "../redux/employee-slice";

interface EmployeeViewProps {
  employee: Employee | null;
}

const EmployeeView: React.FC<EmployeeViewProps> = ({ employee }) => {
  if (!employee) return null;

  return (
    <div>
      <h3>{employee.fullName}</h3>
      <p>Email: {employee.email}</p>
      {/* <p>Position: {employee.position}</p> */}
      <p>
        Image: <img src={employee.image} alt="Employee" width="100" />
      </p>
    </div>
  );
};

export default EmployeeView;
