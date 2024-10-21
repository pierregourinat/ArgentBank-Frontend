import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post("http://localhost:3001/user/login", {
      email,
      password,
    });
    dispatch(setUser(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.response.data));
    dispatch(setLoading(false));
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;
