import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchEmployees,
  deleteEmployee,
  selectEmployee,
  createEmployee,
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
import { toast } from "react-toastify";

// Define Employee type if not already defined
interface Employee {
  _id: string;
  fullName: string;
  email: string;
  position: string;
}

const EmployeeList: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees.list);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEdit = (_id: string) => {
    const selected = employees.find((emp) => emp._id === _id);
    if (selected) {
      dispatch(selectEmployee(selected));
      navigate(`/edit/${_id}`);
    }
  };

  const handleDelete = (_id: string) => {
    dispatch(deleteEmployee(_id))
      .then(() => {
        toast.success("Employee deleted successfully!");
      })
      .catch((error) => {
        toast.error(
          `Failed to delete employee: ${error.message || "Unknown error"}`
        );
      });
  };

  const handleCreate = () => {
    navigate(`/create`);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleCreate()} // Pass the employee object here
      >
        Create Employee
      </Button>

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
              <TableRow key={emp._id}>
                <TableCell>{emp.fullName}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(emp._id)}>Edit</Button>
                  <Button onClick={() => handleDelete(emp._id)}>Delete</Button>
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
    </div>
  );
};

export default EmployeeList;
