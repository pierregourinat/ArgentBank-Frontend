import { setUser, setLoading, setError, logout } from "../slices/authSlice";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case setUser.type:
      return { ...state, user: action.payload };
    case setLoading.type:
      return { ...state, isLoading: action.payload };
    case setError.type:
      return { ...state, error: action.payload };
    case logout.type:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
