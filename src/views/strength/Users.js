import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadCustomers,
  toggleUserStatus,
  restoreCustomer,
} from "../../redux/actions/customers";
import { checkToken } from "../../redux/actions/auth";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";
import {
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CModalBody,
  CContainer,
  CModalHeader,
  CModalFooter,
  CFormGroup,
  CForm,
  CLabel,
  CInput,
} from "@coreui/react";

const getBadge = (isActive) => {
  switch (isActive) {
    case true:
      return "success";
    case false:
      return "danger";
    default:
      return "primary";
  }
};

const fields = [
  { key: "name", _style: { width: "20%" } },
  { key: "penNumber", label: "Pen Number", _style: { width: "10%" } },
  {
    key: "station",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
  {
    key: "dutyStatus",
    label: "Duty Status",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
];

const Users = ({
  users,
  loading,
  loadCustomers,
  checkToken,
  isAuthenticated,
}) => {
  const [toggling, setToggling] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const initialState = {
    customer: "user",
    email: "",
    password: "",
  };
  const [state, setstate] = useState(initialState);
  const [modal, setModal] = useState(false);
  const handleChange = (event) => {
    let { name, value } = event.target;
    setstate((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const restore = async (e) => {
    e.preventDefault();
    await restoreCustomer({ ...state });
    // console.log(state);
    setModal(!modal);
    setstate(initialState);
  };

  useEffect(() => {
    const loadData = async () => {
      await loadCustomers();
    };
    loadData();
    checkToken();
    setDataLoading(false);
  }, [loadCustomers, checkToken]);

  const history = useHistory();

  const toggleStatus = async (id) => {
    setToggling(id);
    let action = await toggleUserStatus(id);
    setToggling("");
    if (!action) {
      alert("Sorry server is bussy");
    }
  };
  if (!isAuthenticated) {
    <Redirect to="/login" />;
  }
  return (
    <Fragment>
      {loading || dataLoading ? (
        <Loader
          className="loader"
          type="Puff"
          color="#321FDB"
          height={150}
          width={150}
          timeout={3000} //3 secs
        />
      ) : (
        <Fragment>
          <CModal show={modal} onClose={() => setModal(!modal)}>
            <CModalHeader closeButton>Delete User</CModalHeader>

            <CContainer fluid>
              <CForm onSubmit={restore}>
                <CModalBody>
                  Please Enter the Mail Id you want to restore.
                  <CFormGroup>
                    <CLabel htmlFor="email">Email</CLabel>
                    <CInput
                      type="email"
                      name="email"
                      placeholder="Enter Email ID.."
                      onChange={handleChange}
                      value={state.email}
                    />
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

          {!users ? (
            <h2>No data</h2>
          ) : (
            <CRow>
              <CCol xl={12}>
                <CDataTable
                  items={users}
                  fields={fields}
                  hover
                  striped
                  itemsPerPage={5}
                  itemsPerPageSelect
                  pagination
                  columnFilter
                  scopedSlots={{
                    status: (item) => (
                      <td className="py-2">
                        <CButton
                          variant="outline"
                          shape="square"
                          size="sm"
                          color={getBadge(item.isactive)}
                          onClick={() => toggleStatus(item._id)}
                        >
                          {toggling === item._id
                            ? "loading.."
                            : item.isactive
                            ? "Active"
                            : "Blocked"}
                        </CButton>
                      </td>
                    ),
                    show_details: (item, index) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => history.push(`/users/${item._id}`)}
                          >
                            Show
                          </CButton>
                        </td>
                      );
                    },
                  }}
                />
              </CCol>
            </CRow>
          )}
        </Fragment>
      )}
      <CRow>
        <CCol className="form-inline justify-content-sm-end">
          <CButton
            className="big_btn"
            color="warning"
            onClick={(e) => {
              e.preventDefault();
              setModal(!modal);
            }}
          >
            <CIcon content={freeSet.cilLevelDown} />
            Restore
          </CButton>
        </CCol>
      </CRow>
    </Fragment>
  );
};
Users.propTypes = {
  users: PropTypes.arrayOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
  loadCustomers: PropTypes.func.isRequired,
  toggleUserStatus: PropTypes.func.isRequired,
  checkToken: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  restoreCustomer: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.customers.users,
  loading: state.customers.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  loadCustomers,
  toggleUserStatus,
  checkToken,
  restoreCustomer,
})(Users);