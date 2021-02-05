import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CAlert } from '@coreui/react';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div className="alert mt-2" id='alert' key={alert.id}>
      <CAlert color={alert.alertType}>{alert.msg}</CAlert>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapPropsToState = (state) => ({
  alerts: state.alert,
});

export default connect(mapPropsToState)(Alert);
