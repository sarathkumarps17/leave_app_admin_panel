import setAuthToken from "../../utils/setAuthToken";
import { setAlert } from "./alert";
import {
  SHO_LOADED, AC_LOADED, SI_LOADED, USERS_LOADING_FAILED

} from "../types";
import action from "./api";

export const addUser = (userData) => async (dispatch) => {
  if (localStorage.token) {
    console.log(userData);
    try {
      setAuthToken(localStorage.token);
      let res;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ ...userData });
      res = await action.put(`/admin/addUser`, body, config);
      if (res.status === 200) {
        dispatch(setAlert("User Added Successfully", "success"));
      } else {
        dispatch(setAlert("Failed Adding User", "warning"));
      }
    } catch (err) {
      if (err.response.status === 400)
        return dispatch(setAlert("User Alredy Exist", "warning"));
      dispatch(setAlert("Failed Adding User", "danger"));
      // console.log(err.response.data.err);
    }
  }
};


export const fetchUsers = (userType) => async (dispatch) => {
  if (localStorage.token) {
    try {
      setAuthToken(localStorage.token);
      let res = await action.get(`/admin/getUsers/${userType}`);
      if (res.data) {
        console.log(res.data);
        let type
        switch (userType) {
          case "AC":
            type = AC_LOADED
            break;
          case "SHO":
            type = SHO_LOADED
            break;
          case "SI":
            type = SI_LOADED
            break;
          default:
            type = USERS_LOADING_FAILED
            break;
        }
        dispatch({
          type: type,
          payload: res.data,
        });
        dispatch(setAlert("User loaded", "success"));
      } else {
        dispatch({
          type: USERS_LOADING_FAILED,
        });
        dispatch(setAlert("Failed Loading Users", "warning"));
      }
    } catch (err) {
      dispatch({
        type: USERS_LOADING_FAILED,
      });
      dispatch(setAlert("Server Error", "danger"));
      // console.log(err.response.data.err);
    }
  }
}
