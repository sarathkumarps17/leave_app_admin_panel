import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import getFulldate from "../../utils/date";
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
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { deleteCustomer } from "../../redux/actions/customers";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

// import usersData from './UsersData'

const User = ({ users, match, deleteCustomer }) => {
  const history = useHistory();
  const initialState = {
    id: match.params.id,
    customer: "user",
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
    await deleteCustomer({ ...state });
    setModal(!modal);
    setstate(initialState);
  };
  const user = users.find((user) => user._id === match.params.id);
  let status;
  if (user) {
    if (user.isactive) {
      status = "Active";
    } else {
      status = "Blocked";
    }
  }
  const getDob = (dateString) => {
    dateString = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let year = dateString.getFullYear();
    let month = dateString.getMonth();
    let day = dateString.getDate();

    return `${day}/${monthNames[month]}/${year}`;
  };
  const getString = (value) => {
    if (value) return "Yes";
    else return "No";
  };
  const userDetails = user
    ? Object.entries({
      Email: user.email,
      "Account Verified": getString(user.emailverified),
      Phone: user.phone,
      "Phone Verified": getString(user.phoneverified),
      "Full Name": user.firstname + " " + user.lastname,
      Dob: getDob(user.dob),
      Gender: user.gender,
      Status: status,
      "User since": getFulldate(user.createdAt),
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
        <Redirect to="/users" />
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
                        <h3>{user.firstname + " " + user.lastname}</h3>
                      </CCol>
                      <CCol className="form-inline justify-content-sm-end">
                        {user.avataroriginal && (
                          <CImg
                            src={user.avataroriginal}
                            fluid
                            className="mb-2"
                            height="100px"
                            shape="circle"
                            align="center"
                          ></CImg>
                        )}
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
                          <td>View</td>
                          <td>
                            <CButton
                              children="View"
                              color="success"
                              variant="outline"
                              onClick={() =>
                                history.push(`/users/albums/${match.params.id}`)
                              }
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
  users: PropTypes.arrayOf(Object).isRequired,
  deleteCustomer: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.customers.users,
});

export default connect(mapStateToProps, { deleteCustomer })(User);
