import setAuthToken from "../../utils/setAuthToken";
import { setAlert } from "./alert";
import {
    LEAVE_LOADED, LEAVE_LOADING_FAILED

} from "../types";
import action from "./api";

export const fetchLeaveRequests = () => async (dispatch) => {
    if (localStorage.token) {
        // console.log(userData);
        try {
            setAuthToken(localStorage.token);
            let res;
            res = await action.get(`/admin/leaveRequests`);
            console.log(res.data);
            if (res.data) {
                dispatch({
                    type: LEAVE_LOADED,
                    payload: res.data,
                });
                dispatch(setAlert("Leave requests loaded", "success"));
            }
        } catch (err) {
            console.log(err);
            dispatch({
                type: LEAVE_LOADING_FAILED,
            });
            //   if (err.response.status === 400)
            //     return dispatch(setAlert("User Alredy Exist", "warning"));
            dispatch(setAlert("Failed loading requests", "warning"));
            // console.log(err.response.data.err);
        }
    }
};

export const confirmLeaveRequest = (leaveId, dateIds, aprovalStatus) => async (dispatch) => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify({ leaveId, dateIds, aprovalStatus });
            let res = await action.put("admin/confirmLeaveRequest", body, config);
            console.log(res.status);
            if (res.status === 200) {
                await dispatch(fetchLeaveRequests);
                dispatch(setAlert(`Leave ${aprovalStatus} `, "success"));

            }
        }
    } catch (error) {
        dispatch(setAlert("Failed Leave confirmation", "warning"));

    }
}