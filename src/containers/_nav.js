/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";

export default [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: (
      <CIcon
        content={freeSet.cilSpeedometer}
        customClasses="c-sidebar-nav-icon"
      />
    ),
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Strength",
    icon: (
      <CIcon content={freeSet.cilUser} customClasses="c-sidebar-nav-icon" />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "ACPs",
        to: "/acp",
        icon: (
          <CIcon content={freeSet.cilLan} customClasses="c-sidebar-nav-icon" />
        ),
      },
      {
        _tag: "CSidebarNavItem",
        name: "SHOs",
        to: "/sho",
        icon: (
          <CIcon content={freeSet.cilHome} customClasses="c-sidebar-nav-icon" />
        ),
      },
      {
        _tag: "CSidebarNavItem",
        name: "SIs",
        to: "/si",
        icon: (
          <CIcon
            content={freeSet.cilShieldAlt}
            customClasses="c-sidebar-nav-icon"
          />
        ),
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Leave",
    to: "/conversion-rates",
    icon: (
      <CIcon
        content={freeSet.cilBalanceScale}
        customClasses="c-sidebar-nav-icon"
      />
    ),
  },
];
