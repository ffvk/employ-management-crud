import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://interviewtesting.onrender.com/v1/users"; // Replace with the base URL from Postman.

export interface Employee {
  _id: string;
  fullName: string;
  email: string;
  position: string;
  image: string; // Dummy image URL
}

interface EmployeeState {
  list: Employee[];
  selectedEmployee: Employee | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: EmployeeState = {
  list: [],
  selectedEmployee: null,
  status: "idle",
};

// Async actions
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/employee/list`);
    return response.data.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: string) => {
    await axios.delete(
      `${API_BASE_URL}/employee-remove/66f26341aa89fa4a244b22`
    );
    return id;
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (employee: Employee) => {
    const response = await axios.put(
      `${API_BASE_URL}/employee-update/${employee._id}`,
      employee
    );
    return response.data;
  }
);

// Slice
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    selectEmployee: (state, action: PayloadAction<Employee | null>) => {
      state.selectedEmployee = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((emp) => emp._id !== action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.list = state.list.map((emp) =>
          emp._id === action.payload.id ? action.payload : emp
        );
        state.selectedEmployee = action.payload;
      });
  },
});

export const { selectEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
