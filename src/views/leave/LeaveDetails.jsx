import React, { Fragment, useEffect } from "react";
import { confirmLeaveRequest } from "../../redux/actions/leave";
import { useImmer } from "use-immer";
import {
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CDropdown,
    CForm,
    CButton,
    CCard,
    CCardBody,
    CInputCheckbox,
    CCardHeader,
    CCol,
    CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { connect } from "react-redux";


const LeaveDetails = ({ leave, modelShow, confirmLeaveRequest, adminType }) => {
    const [state, setState] = useImmer({
        leaveId: leave._id, dateIds: []
    });
    useEffect(() => {
        let ids = leave.leaveDetails.filter(item => item.aproved === true);
        setState(preVal => { ids.map(id => preVal.dateIds.push(id._id)) });
        console.log(state);
        return () => {

        }
    }, [])

    const submitLeave = async (aprovalStatus) => {
        if (!state.dateIds.length && aprovalStatus === "forwarded") {
            alert("Please select atleast one day or reject apllication")
        } else {
            await confirmLeaveRequest(state.leaveId, state.dateIds, aprovalStatus);
            console.log(state, aprovalStatus);
            window.location.reload(false);
            modelShow({ show: false, leave: {} });

        }
    }

    let station = ""
    // let stationCharge = false
    if (leave.userId.userType === 2) {
        station = leave.userId.subdivision.name;
        // stationCharge = leave.userId.subdivisionCharge
    } else if (leave.userId.userType === 3 || 4 || 5) {
        station = leave.userId.station.name;
        // stationCharge = leave.userId.stationCharge;
    }
    let mapableLeave = leave && leave.userId
        ? Object.entries({
            "Request No": leave.reqNumber,
            applicationDate: new Date(leave.applicationDate).toDateString().slice(3),
            "Subdivision/Station": station,
            // "Subdivision/Station charge": stationCharge,
            "Reason": leave.applicationReason,
            "Leave Remianing": leave.userId.availableLeave.cl,
            "Last leave Taken": "Later",
        })
        : [
            [
                "id",
                <span>
                    <CIcon className="text-muted" name="cui-icon-ban" /> Not found
          </span>,
            ],
        ];
    return (
        <Fragment>
            <CRow>
                <CCol lg={6}>
                    <CCard>
                        <CCardHeader>
                            <CRow className="justify-content-center">
                                Leave Details
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CCol>
                                <table className="table table-striped table-hover">
                                    <tbody>
                                        {mapableLeave.map(([key, value], index) => {
                                            return (

                                                <tr key={index.toString()}>
                                                    <td>{`${key}:`}</td>
                                                    <td>
                                                        <strong>{value}</strong>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </CCol>

                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol>
                    <CRow>
                        <CCol>
                            <table className="table table-striped table-hover">
                                <tbody>
                                    <tr>
                                        <td>
                                            Applied Days
                                            </td>
                                        <td>
                                            Leave Type
                                            </td>
                                        <td>
                                            Confirmation
                                            </td>
                                    </tr>
                                    {leave.leaveDetails.map(item => {
                                        return <tr key={item._id}>
                                            <td>
                                                {new Date(item.date).toDateString().slice(3)}
                                            </td>
                                            <td>
                                                {item.leaveType.toUpperCase()}
                                            </td>
                                            <td >
                                                <CForm>
                                                    <CInputCheckbox
                                                        checked={state.dateIds.includes(item._id) ? true : false}
                                                        // value={state.dateIds.includes(item._id) ? true : false}
                                                        onChange={(e) => {
                                                            console.log(e.target.checked)
                                                            if (e.target.checked) {
                                                                setState(preVal => { preVal.dateIds.push(item._id) })
                                                            } else
                                                                setState(preVal => { preVal.dateIds = preVal.dateIds.filter(it => it.id === item._id) })
                                                        }}
                                                    />

                                                </CForm>

                                            </td>
                                        </tr>

                                    })}
                                </tbody>
                            </table>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol className="reject-btn">
                            <CButton
                                className="x_btn"
                                color='danger' onClick={(e) => {
                                    e.preventDefault();
                                    submitLeave("rejected")
                                }}>
                                Reject Leave
                </CButton>
                        </CCol>
                        <CCol>
                            <CDropdown
                                className="mt-2">
                                <CDropdownToggle caret color="success">
                                    Action
                         </CDropdownToggle>
                                <CDropdownMenu
                                >
                                    <CDropdownItem
                                        disabled={adminType === "CP" ? true : false}
                                        children="Forwarded"
                                        icon='forward'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            submitLeave("forwarded")
                                        }

                                        }
                                    />
                                    <CDropdownItem
                                        disabled={leave.userId.userType === 2 && adminType !== "CP" ? true : false}
                                        children="Approve"
                                        icon='checkmark'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            submitLeave("approved")
                                        }

                                        }
                                    />
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>



                    </CRow>

                </CCol>
            </CRow>
        </Fragment>
    )
}
const mapStateToProps = state => ({
    adminType: state.auth.adminType
})
export default connect(mapStateToProps, { confirmLeaveRequest })(LeaveDetails);
