import { combineReducers } from "redux";
import alertReducer from "../reducers/alertReducer";
import authReducer from "../reducers/authReducer";
import dashboardDataReducer from "../reducers/dashboardDataReducer";
import sidebarToggler from "../reducers/sidebarToggler";
export const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  show: sidebarToggler,
  data: dashboardDataReducer,
});
