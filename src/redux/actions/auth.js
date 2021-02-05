import setAuthToken from "../../utils/setAuthToken";
import {
  LOGIN_SUCSUSS,
  LOGIN_FAILURE,
  LOGOUT,
  TOKEN_VALID,
  TOKEN_EXPRIED,
} from "../types";

import { setAlert } from "./alert";

import action from "./api";
import { dashboardData } from "./dashboard";

////////////////////////////////LOGIN USER////////////////////////////

export const login = ({ userName, password }) => async (dispatch) => {
  try {
    let res;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ userName, password });
    res = await action.post(`/login`, body, config);
    dispatch({
      type: LOGIN_SUCSUSS,
      payload: res.data,
    });
    dispatch(setAlert("You have Loged In", "success"));
    dispatch(dashboardData());
  } catch (err) {
    try {
      dispatch({ type: LOGIN_FAILURE });
      if (err.response.data.err)
        dispatch(setAlert(err.response.data.err, "danger"));
      else dispatch(setAlert("Server Isuue please try Later", "danger"));
    } catch (error) {
      dispatch(setAlert("Server Isuue please try Later", "danger"));
    }
    // console.log(err.response.data.err);
  }
};

////////////////////// REGISTER Admin ////////////////////////////////

export const register = ({
  prevEmail,
  newEmail,
  prevPassword,
  newPassword,
}) => async (dispatch) => {
  try {
    let res;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      prevEmail,
      newEmail,
      prevPassword,
      newPassword,
    });
    res = await action.put("/login", body, config);
    // console.log(res.status);
    if (res.status !== 200) {
      dispatch(setAlert("Sorry Resetting Credentials Failed", "danger"));
      return false;
    }
    dispatch(setAlert("You Have Succsessfully Changed Credentials", "success"));
    return true;
  } catch (err) {
    console.log(err);
    console.log(err.response.status);
    if (err.response.status === 404) {
      dispatch(setAlert("Credentials not matching", "warning"));
    } else if (err.response.status === 500) {
      dispatch(setAlert("Sorry Serrver Error", "danger"));
    }
    return false;
  }
};

//////////////Varify Token ///////////////////////////////////////////
export const checkToken = () => async (dispatch) => {
  if (!localStorage.token) {
    dispatch({
      type: TOKEN_EXPRIED,
    });
  }
  setAuthToken(localStorage.token);
  try {
    let res = await action.get("login/");
    if (res.status !== 200) {
      dispatch({
        type: TOKEN_EXPRIED,
      });
    }
    dispatch({
      type: TOKEN_VALID,
    });
  } catch (error) {
    dispatch({
      type: TOKEN_EXPRIED,
    });
  }
};

////////////////////// LOGOUT ////////////////////////////////////////////
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch(setAlert("loged Out", "warning"));
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
