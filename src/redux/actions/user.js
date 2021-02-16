import setAuthToken from "../../utils/setAuthToken";
import { setAlert } from "./alert";

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
