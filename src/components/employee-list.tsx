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
import { toast } from "react-toastify";

const EmployeeList: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees.list);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Update the handleEdit function to use '_id' instead of 'id'
  const handleEdit = (_id: string) => {
    console.log("  _id", _id);

    const selected = employees.find((emp) => emp._id === _id); // Use '_id' for search

    if (selected) {
      dispatch(selectEmployee(selected));
      navigate(`/edit/${_id}`); // Pass '_id' for navigation
    }
  };

  // Update the handleDelete function to use '_id' instead of 'id'
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
            <TableRow key={emp._id}>
              {" "}
              {/* Use '_id' as the key */}
              <TableCell>{emp.fullName}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.position}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(emp._id)}>Edit</Button>{" "}
                {/* Pass '_id' */}
                <Button onClick={() => handleDelete(emp._id)}>
                  Delete
                </Button>{" "}
                {/* Pass '_id' */}
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
