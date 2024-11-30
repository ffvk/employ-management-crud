import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://interviewtesting.onrender.com/v1/users"; // Replace with the base URL from Postman.

export interface Employee {
  _id: string;
  fullName: string;
  email: string;
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
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/employee-remove/${id}`);
      return id; // Return the id if delete is successful
    } catch (error: any) {
      // Extract the error message from the axios error response if available
      const errorMessage = error?.response?.data?.message || "Unknown error";
      return rejectWithValue(errorMessage); // Reject with the error message
    }
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

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employee: Employee, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/employee/create`,
        employee
      );
      return response.data; // Return the created employee data
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Unknown error";
      return rejectWithValue(errorMessage); // Reject with the error message
    }
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
