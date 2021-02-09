import { CButton } from "@coreui/react";
import { useHistory } from "react-router-dom";
import React from "react";
import Users from "../Users";
const ListAcs = () => {
  const history = useHistory();
  return (
    <div>
      <Users data={{ users: [], loading: false }} userType="ACP List" />
      <CButton
        className="x_btn"
        color="success"
        children="Add new ACP"
        onClick={() => history.push("/add_ac")}
      />
    </div>
  );
};

export default ListAcs;
