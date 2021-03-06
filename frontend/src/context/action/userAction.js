import axios from "axios";
import {
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../constants/userConstant";

//user login
export const login = (user) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { Headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/login", user, config);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.error });
  }
};

//Load User me
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/me");
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.error });
  }
};

//LOGOUT User
export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/logout");
    console.log(data);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGOUT_FAIL, payload: "Failed to Logout" });
  }
};

// register
export const register = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { Headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/register", { email, password }, config);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.error });
  }
};
