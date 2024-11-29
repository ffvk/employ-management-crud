import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EmployeeView from "./employee-view";

const EmployeeList: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees.list);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // State to manage the modal visibility and selected employee
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEdit = (_id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const selected = employees.find((emp) => emp._id === _id);
    if (selected) {
      dispatch(selectEmployee(selected));
      navigate(`/edit/${_id}`);
    }
  };

  const handleDelete = (_id: string, event: React.MouseEvent) => {
    event.stopPropagation();
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

  const handleRowClick = (employee: any) => {
    setSelectedEmployee(employee); // Set the selected employee data
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleCreate()}
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
              <TableRow key={emp._id} onClick={() => handleRowClick(emp)}>
                <TableCell>{emp.fullName}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>
                  <Button onClick={(e) => handleEdit(emp._id, e)}>Edit</Button>
                  <Button onClick={(e) => handleDelete(emp._id, e)}>
                    Delete
                  </Button>
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

      {/* EmployeeView Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
          <EmployeeView employee={selectedEmployee} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
