/* eslint-disable import/no-anonymous-default-export */
import {
    CI_LOADED, AC_LOADED, SI_LOADED,
    USERS_LOADING_FAILED,
    LOGOUT
} from "../types";

const initialState = {
    loading: true,
    AC: [],
    CI: [],
    SI: []
};

export default function (state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case AC_LOADED:
            return {
                ...state,
                loading: false,
                AC: [...payload]
            };
        case CI_LOADED:
            return {
                ...state,
                loading: false,
                CI: [...payload]
            };
        case SI_LOADED:
            return {
                ...state,
                loading: false,
                SI: [...payload]
            };
        case USERS_LOADING_FAILED:
        case LOGOUT:
            return {
                loading: false,
                AC: [],
                CI: [],
                SI: []
            };
        default:
            return state;
    }
}
