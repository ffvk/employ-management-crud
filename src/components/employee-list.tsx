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

  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
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

  const handleDelete = (_id: string) => {
    dispatch(deleteEmployee(_id))
      .then(() => {
        toast.success("Employee deleted successfully!");
        setOpenConfirmModal(false); // Close the confirmation dialog
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
    setSelectedEmployee(employee);
    setOpenEmployeeModal(true);
  };

  const handleOpenConfirmModal = (employee: any, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedEmployee(employee);
    setOpenConfirmModal(true);
  };

  const handleCloseEmployeeModal = () => {
    setOpenEmployeeModal(false);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
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
                <TableCell>
                  <Button onClick={(e) => handleEdit(emp._id, e)}>Edit</Button>
                  <Button onClick={(e) => handleOpenConfirmModal(emp, e)}>
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
      <Dialog open={openEmployeeModal} onClose={handleCloseEmployeeModal}>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
          <EmployeeView employee={selectedEmployee} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEmployeeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={openConfirmModal} onClose={handleCloseConfirmModal}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{" "}
          <strong>{selectedEmployee?.fullName}</strong>?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleDelete(selectedEmployee?._id)}
            color="error"
          >
            Delete
          </Button>
          <Button onClick={handleCloseConfirmModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
