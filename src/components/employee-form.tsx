import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { updateEmployee, createEmployee } from "../redux/employee-slice";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const employee = useSelector(
    (state: RootState) => state.employees.selectedEmployee
  );

  // Default fallback to avoid null initialization
  const [form, setForm] = useState({
    _id: employee?._id || "",
    fullName: employee?.fullName || "",
    email: employee?.email || "",
    position: employee?.position || "",
    image: employee?.image || "",
  });

  // Update form when the selected employee changes
  useEffect(() => {
    if (employee) {
      setForm(employee);
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async () => {
    if (form) {
      try {
        if (form._id) {
          // Update employee
          await dispatch(updateEmployee(form)).unwrap();
          toast.success("Employee updated successfully!");
        } else {
          // Create new employee
          await dispatch(createEmployee(form)).unwrap();
          toast.success("Employee created successfully!");
        }

        // Navigate to the home page after successful submission
        navigate("/");
      } catch (error: any) {
        toast.error(
          `Failed to ${form._id ? "update" : "create"} employee: ${
            error.message || "Unknown error"
          }`
        );
      }
    }
  };

  return (
    <form>
      <TextField
        label="Full Name"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Position"
        name="position"
        value={form.position}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {form._id ? "Update" : "Create"} Employee
      </Button>
    </form>
  );
};

export default EmployeeForm;
