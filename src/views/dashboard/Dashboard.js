/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { checkToken } from "../../redux/actions/auth";
import { connect } from "react-redux";
import DataWidget from "../widgets/DataWidget";
import StatusWidget from "../widgets/StatusWidget";
import { CCol, CRow } from "@coreui/react";
import LeaveCalendar from "./LeaveCalendar";
import { getCityStrength } from "../../redux/actions/dashboard"
// import UserStatChart from "./UserStatChart";

const Dashboard = ({ getCityStrength, checkToken, isAuthenticated }) => {
  let initialState = { AC: { strength: 0, leave: 0, unavailable: 0 }, IO: { strength: 0, leave: 0, unavailable: 0 }, SI: { strength: 0, leave: 0, unavailable: 0 } };
  const [state, setstate] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const fetchStrength = async () => {
    setLoading(true)
    try {
      let res = await getCityStrength();
      if (res) {
        setstate(res);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  }

  useEffect(() => {
    checkToken();
    fetchStrength();
  }, [checkToken]);
  if (!isAuthenticated) {
    <Redirect to="/login" />;
  };

  // console.log(state)
  let { AC, IO, SI } = state;
  let AcStrength = AC.strength;
  let Acleave = AC.leave;
  let AcUnavailabel = AC.unavailable;
  let AcAvailable = AcStrength - (Acleave + AcUnavailabel);
  let IoStrength = IO.strength;
  let IoLevae = IO.leave;
  let IoUnavailable = IO.unavailable;
  let IoAvailable = IoStrength - (IoLevae + IoUnavailable);
  let SiStrength = SI.strength;
  let SiLeave = SI.leave;
  let SiUnavailable = SI.unavailable;
  let SiAvalable = SiStrength - (SiLeave + SiUnavailable);
  return (
    <Fragment>
      {!loading && (
        <CRow className="strength">
          <CCol sm="8" lg="4">
            <DataWidget
              datapoints={[10, 23, 163, 128, 329, 335, 523, 420, 360]}
              color="warning"
              data={{ AC: AcStrength, IO: IoStrength, SI: SiStrength }}
              // header={data.totalUsers}
              customers="users"
              text="Total Strength"
            />
          </CCol>
          <CCol sm="8" lg="4">
            <StatusWidget
              // withCharts
              // datapoints={[0,0,1,6,28,29,35,23,20,60]}
              color="danger"
              leave={{ AC: Acleave, IO: IoLevae, SI: SiLeave }}
              rightFooter="Leave"
              unavailable={{ AC: AcUnavailabel, IO: IoUnavailable, SI: SiUnavailable }}
              leftFooter="Unavailable"
              iconName="cilUserUnfollow"
            />
          </CCol>
          <CCol sm="8" lg="4">
            <DataWidget
              datapoints={[1, 3, 13, 8, 29, 35, 23, 20, 36]}
              color="success"
              customers="advertisers"
              data={{ AC: AcAvailable, IO: IoAvailable, SI: SiAvalable }}
              // header={data.totalAdvertisers}
              text="Available Strength"
            />
          </CCol>
        </CRow>
      )}
      <LeaveCalendar />
    </Fragment>
  );
};

Dashboard.propTypes = {
  checkToken: PropTypes.func.isRequired,
  // dashboardData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getCityStrength, checkToken })(
  Dashboard
);
