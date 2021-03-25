/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";

// let adminType = localStorage.getItem("adminType");
// let dcp_tab = false
// if (adminType === "CP") dcp_tab = true
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
    _tag: "CSidebarNavItem",
    name: "Leave Stat",
    to: "/leaveStat",
    icon: (
      <CIcon
        content={freeSet.cilLibrary}
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
        to: "/AC",
        icon: (
          <CIcon content={freeSet.cilLan} customClasses="c-sidebar-nav-icon" />
        ),
      },
      {
        _tag: "CSidebarNavItem",
        name: "Inspector's",
        to: "/CI",
        icon: (
          <CIcon content={freeSet.cilHome} customClasses="c-sidebar-nav-icon" />
        ),
      },
      {
        _tag: "CSidebarNavItem",
        name: "Sub Inspector's",
        to: "/SI",
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
    _tag: "CSidebarNavDropdown",
    name: "Leave",
    icon: <CIcon content={freeSet.cilPen} customClasses="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "AC Leave",
        to: "/ac_leave",
        icon: (
          <CIcon content={freeSet.cilLan} customClasses="c-sidebar-nav-icon" />
        ),
      },
      {
        _tag: "CSidebarNavItem",
        name: "Officer's Leave",
        to: "/officers_leave",
        icon: (
          <CIcon content={freeSet.cilHome} customClasses="c-sidebar-nav-icon" />
        ),
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "DCP Leave",
      //   to: "/dcp_leave",
      //   addLinkClass: 'c-disabled',
      //   disabled: true,
      //   icon: (
      //     <CIcon
      //       content={freeSet.cilShieldAlt}
      //       customClasses="c-sidebar-nav-icon"
      //     />
      //   ),
      // }

    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Profile",
    to: "/profile",
    icon: (
      <CIcon content={freeSet.cilSettings} customClasses="c-sidebar-nav-icon" />
    ),
  },
];
