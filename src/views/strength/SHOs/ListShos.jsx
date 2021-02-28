import React from "react";
import Users from "../Users";
import { CButton } from "@coreui/react";
import { useHistory } from "react-router-dom";
const ListShos = () => {
  const history = useHistory();
  return (
    <div>
      <Users userType={3} />
      <CButton
        className="x_btn"
        color="success"
        children="Add new Inspector"
        onClick={() => history.push("/add_sho")}
      />
    </div>
  );
};

export default ListShos;
