import * as actions from "./constants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: actions.LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/auth/login",
      { email, password },
      config
    );

    dispatch({ type: actions.LOGIN_SUCCESS, payload: data.token });
    localStorage.setItem("token", JSON.stringify(data.token));
  } catch (error) {
    dispatch({
      type: actions.LOGIN_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const logout = () => async (dispatch) => {
  await axios.get("/api/v1/auth/logout");
  dispatch({ type: actions.LOGOUT });
  dispatch({ type: actions.PROFILE_RESET });
  localStorage.removeItem("token");
};

export const register = (name, email, password, phone) => async (dispatch) => {
  try {
    dispatch({ type: actions.REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/auth/register",
      { name, email, password, phone },
      config
    );

    dispatch({ type: actions.REGISTER_SUCCESS, payload: data.token });
    dispatch({ type: actions.LOGIN_SUCCESS, payload: data.token });
  } catch (error) {
    dispatch({
      type: actions.REGISTER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const getMe = () => async (dispatch) => {
  try {
    dispatch({ type: actions.PROFILE_REQUEST });

    const { data } = await axios.get("/api/v1/auth/me");

    dispatch({ type: actions.PROFILE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: actions.PROFILE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export const updateMe = (user) => async (dispatch) => {
  try {
    dispatch({ type: actions.PROFILE_UPDATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put("/api/v1/auth/me/update", user, config);

    dispatch({ type: actions.PROFILE_UPDATE_SUCCESS, payload: data.data });
    dispatch({ type: actions.PROFILE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: actions.PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};
