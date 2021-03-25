import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";

import {
    CInput,
    CContainer,
    CLabel,
    CForm,
    CFormGroup,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CModal,
    CModalBody,
    CModalHeader,
    CModalFooter,

} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { deleteUser } from "../../redux/actions/user";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const User = ({ userType, users, deleteUser, }) => {

    const { id } = useParams()
    const initialState = {
        id,
        user: userType,
        password: "",
    };
    const [state, setstate] = useState(initialState);
    const [modal, setModal] = useState(false);
    const handleChange = (event) => {
        let { value } = event.target;
        setstate((preValue) => {
            return {
                ...preValue,
                password: value,
            };
        });
    };

    const deleteAction = async (e) => {
        e.preventDefault();
        await deleteUser(state);
        setModal(!modal);
        setstate(initialState);
    };
    let user = users[userType].filter(user => user._id === id)[0]
    // console.log(user)
    const userDetails = user
        ? Object.entries({
            "PEN Number": user.penNumber,
            "Phone Number": user.phoneNumber,
            "Email": user.email,
            Subdivision: user.subdivision.name,
            "Available CL": user.availableLeave.cl,
            "Duty Status": user.dutyStatus,
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
            {!user ? (
                <Redirect to={`/${userType}`} />
            ) : (
                <Fragment>
                    <CModal show={modal} onClose={() => setModal(!modal)}>
                        <CModalHeader closeButton>Delete User</CModalHeader>

                        <CContainer fluid>
                            <CForm onSubmit={deleteAction}>
                                <CModalBody>
                                    Please Confirm your Action!
                  <CFormGroup>
                                        <CLabel htmlFor="password">Password</CLabel>
                                        <CInput
                                            type="password"
                                            name="password"
                                            placeholder="Enter Password.."
                                            autoComplete="password"
                                            onChange={handleChange}
                                            value={state.password}
                                        />
                                    </CFormGroup>
                                </CModalBody>
                                <CModalFooter>
                                    <CButton type="submit" color="danger">
                                        Confirm
                  </CButton>{" "}
                                    <CButton
                                        color="secondary"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setModal(!modal);
                                        }}
                                    >
                                        Cancel
                  </CButton>
                                </CModalFooter>
                            </CForm>
                        </CContainer>
                    </CModal>
                    <CRow>
                        <CCol lg={8}>
                            <CCard>
                                <CCardHeader>
                                    <CRow className="justify-content-center">
                                        <CCol>
                                            <h3>{user.name}</h3>
                                        </CCol>
                                        <CCol className="form-inline justify-content-sm-end">
                                            <h4>{user.designation}</h4>
                                        </CCol>
                                    </CRow>
                                </CCardHeader>
                                <CCardBody>
                                    <table className="table table-striped table-hover">
                                        <tbody>
                                            {userDetails.map(([key, value], index) => {
                                                return (
                                                    <tr key={index.toString()}>
                                                        <td>{`${key}:`}</td>
                                                        <td>
                                                            <strong>{value}</strong>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            <tr>
                                                <td>View Leaves</td>
                                                <td>
                                                    <CButton
                                                        disabled
                                                        children="View"
                                                        color="success"
                                                        variant="outline"
                                                    // onClick={() =>
                                                    //     history.push(`/leaves/${id}`)
                                                    // }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Change Password</td>
                                                <td>
                                                    <CButton
                                                        disabled
                                                        children="Reset"
                                                        color="primary"
                                                        variant="outline"
                                                    // onClick={() =>
                                                    //     history.push(`/leaves/${id}`)
                                                    // }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Delete User</td>
                                                <td>
                                                    <CButton
                                                        children="Delete"
                                                        color="danger"
                                                        variant="outline"
                                                        onClick={() => setModal(!modal)}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </Fragment>
            )}
        </Fragment>
    );
};
User.propTypes = {
    users: PropTypes.object.isRequired,
    deleteUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    users: state.users
});

export default connect(mapStateToProps, { deleteUser, })(User);
