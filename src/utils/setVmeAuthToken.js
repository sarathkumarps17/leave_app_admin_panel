import action from "../redux/actions/vme.api";

const setAuthToken = (token) => {
  if (token) {
    action.defaults.headers.common["X-Auth-Token"] = token;
  } else {
    delete action.defaults.headers.common["X-Auth-Token"];
  }
};
export default setAuthToken;
