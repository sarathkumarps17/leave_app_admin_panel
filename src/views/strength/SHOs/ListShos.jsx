import React from "react";
import Users from "../Users";
import { CButton } from "@coreui/react";
import { useHistory } from "react-router-dom";
const ListShos = () => {
  const history = useHistory();
  return (
    <div>
      <Users data={{ users: [], loading: false }} userType="SHO List" />
      <CButton
        className="x_btn"
        color="success"
        children="Add new SHO"
        onClick={() => history.push("/add_sho")}
      />
    </div>
  );
};

export default ListShos;
