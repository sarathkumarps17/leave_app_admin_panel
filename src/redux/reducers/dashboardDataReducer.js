import {
    DASHBOARD_DATA_FETCHED, FAILED_DATA_FETCHING, LOGOUT
} from "../types";

const initialState = {
    loading: true,
    data: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case DASHBOARD_DATA_FETCHED:
            return {
                ...state,
                data: [...payload],
                loading: false,
            };
        case FAILED_DATA_FETCHING:
        case LOGOUT:
            return {
                ...initialState
            };

        default:
            return state;
    }
}