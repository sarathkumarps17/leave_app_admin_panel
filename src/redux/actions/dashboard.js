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
export const getCityStrength = () => async (dispatch) => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
            let res = await action.get(`admin/cityStrength`);
            if (res.data) {
                dispatch(setAlert("Strength Fetched", "success"));
                return res.data;

            }
        }
    } catch (error) {
        console.log(error);
        return null
        //     dispatch(
        //         {
        //             type: FAILED_LEAVE_FETCHING,
        //         }
        //     )
        //     dispatch(setAlert("Failed fetching leave application", "warning"));
    }
}

export const getUserLeaveList = (buffer) => async (dispatch) => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
            let res = await action.get(`admin/userLeaveList/${buffer}`);
            if (res.data) {
                dispatch(setAlert("Leave List Fetched", "success"));
                return res.data;
            }
        }
    } catch (error) {
        console.log(error);
        dispatch(setAlert("Leave List Fetching Failed", "warning"));
        return null

    }
}