import React from "react";
import ACLeave from "./views/leave/ACLeave";
import ListLeaveApplications from "./views/leave/ListLeaveApplications";
import OfficersLeave from "./views/leave/OfficersLeave";
import StatPage from "./views/LeaveStat/StatPage";
import AddAc from "./views/strength/ACs/AddAc";
import ListAcs from "./views/strength/ACs/ListAcs";
import ViewAC from "./views/strength/ACs/ViewAC";
import AddSho from "./views/strength/SHOs/AddSho";
import ListShos from "./views/strength/SHOs/ListShos";
import ViewSho from "./views/strength/SHOs/ViewSho";
import AddSi from "./views/strength/SIs/AddSi";
import ListSis from "./views/strength/SIs/ListSis";
import ViewSi from "./views/strength/SIs/ViewSi";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "Home" },

  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  { path: "/leaveStat", exact: true, name: "Leave Stat", component: StatPage },
  { path: "/add_ac", exact: true, name: "Add AC", component: AddAc },
  { path: "/AC", exact: true, name: "ACP List", component: ListAcs },
  { path: "/add_sho", exact: true, name: "Add SHO", component: AddSho },
  { path: "/CI", exact: true, name: "SHO List", component: ListShos },
  { path: "/add_si", exact: true, name: "Add SI", component: AddSi },
  { path: "/SI", exact: true, name: "SI List", component: ListSis },
  { path: "/SI/:id", exact: true, name: "SI ", component: ViewSi },
  { path: "/CI/:id", exact: true, name: "SHO ", component: ViewSho },
  { path: "/AC/:id", exact: true, name: "AC", component: ViewAC },
  {
    path: "/ac_leave",
    exact: true,
    name: "AC Leave Applications",
    component: ACLeave,
  },
  {
    path: "/officers_leave",
    exact: true,
    name: "Officers Leave Applications",
    component: OfficersLeave,
  },
];

export default routes;
