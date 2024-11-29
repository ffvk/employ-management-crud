import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchEmployees,
  deleteEmployee,
  selectEmployee,
} from "../redux/employee-slice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const EmployeeList: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees.list);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEdit = (id: number) => {
    const selected = employees.find((emp) => emp.id === id);
    if (selected) {
      dispatch(selectEmployee(selected));
      navigate(`/edit/${id}`);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteEmployee(id));
  };

  console.log("employees", employees);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Position</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.isArray(employees) && employees.length > 0 ? (
          employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.position}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(emp.id)}>Edit</Button>
                <Button onClick={() => handleDelete(emp.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4}>No employees found</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default EmployeeList;
