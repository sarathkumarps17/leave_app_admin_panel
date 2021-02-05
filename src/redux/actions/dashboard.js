import {
    DASHBOARD_DATA_FETCHED,
    FAILED_DATA_FETCHING

} from "../types";


import action from "./api"
import setAuthToken from "../../utils/setAuthToken";
import { setAlert } from "./alert";
// import { checkToken } from "./auth";

////////////////////////////////Dasghboard Data fetch////////////////////////////

export const dashboardData = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            let res = await action.get(`/admin/dashboard`, config);
            dispatch({
                type: DASHBOARD_DATA_FETCHED,
                payload: res.data,
            });
        } catch (err) {
            console.log(err);
            // let errors = err.response.data.errors;
            // if (errors) {
            //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            // }
            dispatch({ type: FAILED_DATA_FETCHING });
            dispatch(setAlert("Data fetching failed", "danger"));
        }
    }
};
// export const clearData = () => async (dispatch) => {
//             dispatch({
//                 type: DASHBOARD_DATA_FETCHED,})

//     };
