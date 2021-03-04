import React from "react";
import { connect } from "react-redux";
import { logout } from "../redux/actions/auth";
import PropTypes from "prop-types";
import { Redirect, useHistory } from "react-router-dom";
import admin from "../assets/admin.png"
import {
  // CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const TheHeaderDropdown = ({ auth: { isAuthenticated }, logout }) => {
  const history = useHistory();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  const register = () => {
    history.push("/register");
  };
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={admin}
            className="c-avatar-img"
            alt="admin@vacationme.net"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem divider />
        <CDropdownItem onClick={register}>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem onClick={logout}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};
TheHeaderDropdown.propTypes = {
  logout: PropTypes.func.isRequired,
};
const mapStateToprops = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToprops, { logout })(TheHeaderDropdown);
