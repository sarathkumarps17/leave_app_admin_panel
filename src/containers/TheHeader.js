import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CImg,
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import BackButton from "../views/Elements/BackButton";
import logo from "../assets/dome-logo.png";

// routes config
// import routes from "../routes";

import {
  TheHeaderDropdown,
  // TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  // TheHeaderDropdownTasks
} from "./index";
const adminType = localStorage.getItem("adminType");
const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.show.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none">
        <CSubheader>
          <CImg
            src={logo}
            width={100}
            height={100}
            className="c-logo-img"
            alt="logo"
          />
          <h3 className="admin-type">
            {adminType}
          </h3>
        </CSubheader>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/AC">ACs</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/CI">Inspectors</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/SI">SIs</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif />
        {/* <TheHeaderDropdownTasks />
        <TheHeaderDropdownMssg /> */}

        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"

        // routes={routes}
        />
        <BackButton />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-speech" alt="Settings" />
          </CLink>
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            <CIcon name="cil-graph" alt="Dashboard" />
            &nbsp;Dashboard
          </CLink>
        </div>
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
