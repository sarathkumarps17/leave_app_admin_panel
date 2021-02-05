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
// import Users from "../users/Users"
// import {
//   CBadge,
//   CButton,
//   CButtonGroup,
//   CCard,
//   CCardBody,
//   CCardFooter,
//   CCardHeader,
//   CCol,
//   CProgress,
//   CRow,
//   CCallout
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

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
          <CCol sm="6" lg="3">
            <DataWidget
              datapoints={[10, 23, 163, 128, 329, 335, 523, 420, 360]}
              color="warning"
              header={data.totalUsers}
              customers="users"
              text="Users Onboard"
            />
          </CCol>
          <CCol sm="6" lg="3">
            <StatusWidget
              // withCharts
              // datapoints={[0,0,1,6,28,29,35,23,20,60]}
              color="danger"
              rightHeader={data.blockedUsers}
              rightFooter="Blocked Users"
              leftHeader={data.blockedAdvertisers}
              leftFooter="Blocked Advertisers"
              iconName="cilUserUnfollow"
            />
          </CCol>
          <CCol sm="6" lg="3">
            <DataWidget
              datapoints={[1, 3, 13, 8, 29, 35, 23, 20, 36]}
              color="success"
              customers="advertisers"
              header={data.totalAdvertisers}
              text="Advertisers"
            />
          </CCol>
          <CCol sm="6" lg="3">
            <StatusWidget
              // withCharts
              // datapoints={[0, 0, 1, 6, 28, 29, 35, 23, 20, 60]}
              color="primary"
              rightHeader={data.totalAlbums}
              rightFooter="Albums"
              leftHeader={data.totalAdds}
              leftFooter="Ads"
              iconName="cilImagePlus"
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
