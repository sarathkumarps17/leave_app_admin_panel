import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom"
import action from "../../../redux/actions/api";
import { addUser } from "../../../redux/actions/user";
import { freeSet } from '@coreui/icons';
import {
  CSwitch,
  CButton,
  CCard,
  CCardBody,
  CContainer,
  CCol,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Loader from "react-loader-spinner";

const dutyStatus = [
  {
    name: "Active",
    value: "active",
  },
  {
    name: "On Leave",
    value: "leave",
  },
  {
    name: "Transfered",
    value: "transfered",
  },
];
const AddSi = ({ addUser }) => {
  const [state, setstate] = useState({
    stations: [],
    subdivisions: [],
  });
  let history = useHistory()
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    const getPagedetails = async () => {
      try {
        let res = await action.get(`/admin/pageDetails/si`);
        let stations = [];
        if (res) {
          res.data.stations.forEach((item) => {
            stations.push({
              name: item.name,
              _id: item._id,
              subdivision_id: item.subdivision._id,
            });
          });
          setstate({
            stations: stations,
            subdivisions: [...res.data.subdivisions],
          });
          // console.log(state);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPagedetails();
  }, []);
  const initialState = {
    name: "",
    penNumber: "",
    userType: 4,
    phoneNumber: "",
    email: "",
    password: "",
    subdivision: "",
    stationCharge: false,
    specialBranch: "",
    station: "",
    accessLevel: 1,
    availableLeave: {
      cl: 24,
      cOff: 0,
      dayOff: 0,
    },
    dutyStatus: "active",
  };
  const re = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  const pass = new RegExp(/^(?=.*?[#?!@$%^&*-]).{6,}$/);
  const phoneValid = new RegExp(/^[6-9]\d{9}$/);
  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!re.test(values.email)) {
      errors.email = "Invalid Email address";
    }
    if (!values.name) errors.name = " Name is Required";
    if (!values.penNumber) {
      errors.penNumber = "PEN Nunber is Required";
    } else if (!/^[0-9]{6,6}$/i.test(values.penNumber)) {
      errors.penNumber = "Invalid PEN Number";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!phoneValid.test(values.phoneNumber)) {
      errors.phoneNumber = "Invalid Phone Number";
    }
    if (!values.password) {
      errors.password = "Password is Required";
    } else if (!pass.test(values.password)) {
      errors.password =
        "password Siuld be atleast 6 char long and must contain one number and special char";
    }
    if (!values.station) {
      errors.station = "Please Select a station";
    }
    return errors;
  };

  const onSubmit = async (values) => {
    setSubmitting(true);
    let res = await addUser(values);
    setSubmitting(false);
    if (res) history.push("/si")

  };
  const formik = useFormik({
    initialValues: initialState,
    onSubmit,
    validate,
  });

  return (
    <div className="flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="12" lg="8" xl="8">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={formik.handleSubmit}>
                  <h1>Add New SI</h1>
                  {formik.touched.name && formik.errors.name && (
                    <div className="error">{formik.errors.name}</div>
                  )}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      className={
                        formik.touched.name &&
                        formik.errors.name &&
                        "form-control-warning"
                      }
                      type="text"
                      name="name"
                      placeholder="Name"
                      autoComplete="name"
                      required
                      {...formik.getFieldProps("name")}
                    />
                  </CInputGroup>
                  {formik.touched.penNumber && formik.errors.penNumber && (
                    <div className="error">{formik.errors.penNumber}</div>
                  )}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon content={freeSet.cilFingerprint} />
                      </CInputGroupText>
                    </CInputGroupPrepend>

                    <CInput
                      className={
                        formik.touched.penNumber &&
                        formik.errors.penNumber &&
                        "form-control-warning"
                      }
                      type="number"
                      name="penNumber"
                      placeholder="PEN Number"
                      autoComplete="penNumber"
                      required
                      {...formik.getFieldProps("penNumber")}
                    />
                  </CInputGroup>
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <div className="error">{formik.errors.phoneNumber}</div>
                  )}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon content={freeSet.cilPhone} />
                      </CInputGroupText>
                    </CInputGroupPrepend>

                    <CInput
                      className={
                        formik.touched.phoneNumber &&
                        formik.errors.phoneNumber &&
                        "form-control-warning"
                      }
                      type="number"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      autoComplete="phoneNumber"
                      required
                      {...formik.getFieldProps("phoneNumber")}
                    />
                  </CInputGroup>
                  {formik.touched.password && formik.errors.password && (
                    <div className="error">{formik.errors.password}</div>
                  )}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      className={
                        formik.touched.paswword &&
                        formik.errors.paswword &&
                        "form-control-warning"
                      }
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      {...formik.getFieldProps("password")}
                    />
                  </CInputGroup>
                  {formik.touched.email && formik.errors.email && (
                    <div className="error">{formik.errors.email}</div>
                  )}
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      className={
                        formik.touched.email &&
                        formik.errors.email &&
                        "form-control-warning"
                      }
                      type="email"
                      name="email"
                      placeholder="email"
                      {...formik.getFieldProps("email")}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>Select Subdivision</CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect
                      custom
                      name="subdivision"
                      id="SelectLm"
                      required
                      {...formik.getFieldProps("subdivision")}
                    >
                      <option value="" selected disabled hidden>
                        Select Subdivision
                      </option>
                      {state.subdivisions.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </CSelect>
                  </CInputGroup>
                  {formik.errors.station && (
                    <div className="error">{formik.errors.station}</div>
                  )}
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>Select Station</CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect
                      custom
                      name="station"
                      id="SelectLm"
                      required
                      {...formik.getFieldProps("station")}
                    >
                      <option value="" selected disabled hidden>
                        Select Station
                      </option>
                      {state.stations.map((option) => {
                        if (
                          option.subdivision_id === formik.values.subdivision
                        ) {
                          return (
                            <option key={option._id} value={option._id}>
                              {option.name}
                            </option>
                          );
                        } else return null;
                      })}
                    </CSelect>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText><span style={{ textDecoration: formik.values.stationCharge ? "none" : "line-through" }}>Station Charge</span></CInputGroupText>
                    </CInputGroupPrepend>
                    <CCol md="3">

                    </CCol>
                    <CCol md="3">
                      <CSwitch
                        name="stationCharge"
                        className="mr-1"
                        color="success"
                        {...formik.getFieldProps("stationCharge")}
                        // defaultChecked
                        variant="opposite"
                      />
                    </CCol>
                    <CCol md="3">

                    </CCol>

                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>Duty Status</CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect
                      disabled
                      custom
                      name="dutyStatu"
                      id="SelectLm"
                      {...formik.getFieldProps("dutyStatus")}
                    >
                      {dutyStatus.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </CSelect>
                  </CInputGroup>
                  <div className="heading-center"> Available Lave Details</div>

                  <CInputGroup>
                    <CCol md="4">
                      <CLabel>CL Available</CLabel>
                      <CInput
                        type="number"
                        name="availableLeave.cl"
                        placeholder="CL Available"
                        {...formik.getFieldProps("availableLeave.cl")}
                      />
                    </CCol>
                    <CCol md="4">
                      <CLabel>C Off Available</CLabel>
                      <CInput
                        type="number"
                        name="availableLeave.cOff"
                        placeholder="C Off Available"
                        {...formik.getFieldProps("availableLeave.cOff")}
                      />
                    </CCol>
                    <CCol md="4">
                      <CLabel>Day Off Available</CLabel>
                      <CInput
                        type="number"
                        name="availableLeave.dayOff"
                        placeholder="Day Off"
                        {...formik.getFieldProps("availableLeave.dayOff")}
                      />
                    </CCol>
                  </CInputGroup>
                  <div className="sapce">
                    <br></br>
                  </div>
                  {submitting ? (
                    <Loader
                      type="Puff"
                      color="#321FDB"
                      height={25}
                      width={25}
                      timeout={10000} //10 secs
                    />
                  ) : (
                      <CButton
                        className="x_btn"
                        type="submit"
                        color="success"
                        block
                      >
                        Add SI
                      </CButton>
                    )}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
AddSi.propTypes = {
  AddSi: PropTypes.func.isRequired,
};

export default connect(null, { addUser })(AddSi);
