import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/users";

const savedUser = JSON.parse(localStorage.getItem("user"));

// Signup a new user
export const signupUser = createAsyncThunk("auth/signupUser", async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
});

// Login a user
export const loginUser = createAsyncThunk("auth/loginUser", async ({ username, password }) => {
  const response = await axios.get(`${API_URL}?username=${username}&password=${password}`);
  if (response.data.length === 0) {
    throw new Error("Invalid username or password");
  }
  return response.data[0];
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!savedUser,
    user: savedUser || null,
    error: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user"); // Remove user from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Save user to localStorage
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Save user to localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;