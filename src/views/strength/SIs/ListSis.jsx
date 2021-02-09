import React from "react";
import Users from "../Users";
import { CButton } from "@coreui/react";
import { useHistory } from "react-router-dom";
const ListSis = () => {
  const history = useHistory();
  return (
    <div>
      <Users data={{ users: [], loading: false }} userType="SI List" />
      <CButton
        className="x_btn"
        color="success"
        children="Add new SI"
        onClick={() => history.push("/add_si")}
      />
    </div>
  );
};

export default ListSis;
