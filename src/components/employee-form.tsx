import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { updateEmployee } from "../redux/employee-slice";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = () => {
    if (form) {
      dispatch(updateEmployee(form));
      navigate("/");
    }
  };

  return (
    <form>
      <TextField
        label="Name"
        name="name"
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
        Update
      </Button>
    </form>
  );
};

export default EmployeeForm;
