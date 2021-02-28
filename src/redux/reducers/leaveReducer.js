/* eslint-disable import/no-anonymous-default-export */
import {
    LEAVE_LOADED,
    LEAVE_LOADING_FAILED,
    LOGOUT
} from "../types";

const initialState = {
    loading: true,
    leave: []
};

export default function (state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case LEAVE_LOADED:
            return {
                ...state,
                loading: false,
                leave: payload
            };

        case LEAVE_LOADING_FAILED:
        case LOGOUT:
            return {
                loading: false,
                leave: []
            };
        default:
            return state;
    }
}
