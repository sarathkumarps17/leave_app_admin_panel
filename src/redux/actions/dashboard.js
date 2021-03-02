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

            let res = await action.get(`/admin/getMonthlyLeaveStat`);
            if (res.data) dispatch({
                type: DASHBOARD_DATA_FETCHED,
                payload: res.data,
            });
            dispatch(setAlert("Monthly Leave Stat fetched", "success"));

        } catch (err) {
            console.log(err);
            dispatch({ type: FAILED_DATA_FETCHING });
            dispatch(setAlert("Data fetching failed", "danger"));
        }
    }
};
// export const clearData = () => async (dispatch) => {
//             dispatch({
//                 type: DASHBOARD_DATA_FETCHED,})

//     };
