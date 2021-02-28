import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import {
    CContainer,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { connect } from "react-redux";


// import usersData from './UsersData'

const LeaveDetails = ({ leave, type }) => {
    console.log(leave)
    return (
        <Fragment>
            {/* <CTable */}
        </Fragment>
    )
}

export default connect()(LeaveDetails);
