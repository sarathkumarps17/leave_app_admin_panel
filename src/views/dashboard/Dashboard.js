import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { dashboardData } from "../../redux/actions/dashboard";
import PropTypes from "prop-types";
import { checkToken } from "../../redux/actions/auth";
import { connect } from "react-redux";
import DataWidget from "../widgets/DataWidget";
import StatusWidget from "../widgets/StatusWidget";
import { CCol, CRow } from "@coreui/react";
import UserStatChart from "./UserStatChart";

const Dashboard = ({ data, dashboardData, checkToken, isAuthenticated }) => {
  useEffect(() => {
    dashboardData();
    checkToken();
  }, [dashboardData, checkToken]);
  if (!isAuthenticated) {
    <Redirect to="/login" />;
  }
  return (
    <Fragment>
      {!data.loading && (
        <CRow>
          <CCol sm="8" lg="4">
            <DataWidget
              datapoints={[10, 23, 163, 128, 329, 335, 523, 420, 360]}
              color="warning"
              header={data.totalUsers}
              customers="users"
              text="Total Strength"
            />
          </CCol>
          <CCol sm="8" lg="4">
            <StatusWidget
              // withCharts
              // datapoints={[0,0,1,6,28,29,35,23,20,60]}
              color="danger"
              rightHeader={data.blockedUsers}
              rightFooter="Leave"
              leftHeader={data.blockedAdvertisers}
              leftFooter="Unavailable"
              iconName="cilUserUnfollow"
            />
          </CCol>
          <CCol sm="8" lg="4">
            <DataWidget
              datapoints={[1, 3, 13, 8, 29, 35, 23, 20, 36]}
              color="success"
              customers="advertisers"
              header={data.totalAdvertisers}
              text="Available Strength"
            />
          </CCol>
        </CRow>
      )}
      {
        <CRow>
          <CCol>
            <h3>Customer Statistics</h3>
            <UserStatChart style={{ height: "200px", marginTop: "40px" }} />
          </CCol>
        </CRow>
      }
    </Fragment>
  );
};

Dashboard.propTypes = {
  data: PropTypes.object,
  checkToken: PropTypes.func.isRequired,
  dashboardData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data.data,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { dashboardData, checkToken })(
  Dashboard
);
