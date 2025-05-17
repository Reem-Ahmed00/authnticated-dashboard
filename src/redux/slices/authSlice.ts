import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../../types";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface SignupCredentials {
  username: string;
  password: string;
}

const API_URL = "http://localhost:5000/users";

// Load user from localStorage
const savedUser = localStorage.getItem("user");
const parsedUser: User | null = savedUser ? JSON.parse(savedUser) : null;

const initialState: AuthState = {
  isAuthenticated: !!parsedUser,
  user: parsedUser,
  error: null,
};

// Signup a new user
export const signupUser = createAsyncThunk<User, SignupCredentials>(
  "auth/signupUser",
  async (user) => {
    const response = await axios.post<User>(API_URL, user);
    return response.data;
  }
);

// Login a user
export const loginUser = createAsyncThunk<User, LoginCredentials>(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    const response = await axios.get<User[]>(`${API_URL}?username=${username}&password=${password}`);
    if (response.data.length === 0) {
      return rejectWithValue("Invalid username or password");
    }
    return response.data[0];
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
