/* eslint-disable import/no-anonymous-default-export */
import {
  LOGIN_SUCSUSS,
  LOGIN_FAILURE,
  LOGOUT,
  TOKEN_EXPRIED,
  TOKEN_VALID,
} from "../types";

const initialState = {
  loading: true,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  adminType: ""
};

export default function (state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case LOGIN_SUCSUSS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("adminType", payload.adminType);
      return {
        ...state,
        token: payload.token,
        loading: false,
        isAuthenticated: true,
        adminType: payload.adminType,
      };
    case LOGIN_FAILURE:
    case TOKEN_EXPRIED:
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("adminType");
      localStorage.removeItem("persist:root");
      return {
        ...state,
        adminType: "",
        token: null,
        loading: false,
        isAuthenticated: false,
      };
    case TOKEN_VALID:
      return {
        ...state,
        isAuthenticated: true,
      };

    default:
      return state;
  }
}
