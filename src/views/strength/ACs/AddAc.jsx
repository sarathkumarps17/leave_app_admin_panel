import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useFormik } from "formik";
// import { addAc } from "../../../redux/actions/auth";
import {
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
const subdivisions = [
  {
    name: "Thrikkakara",
    value: "trikkakara",
  },
  {
    name: "Central",
    value: "central",
  },
  {
    name: "Mattancheri",
    value: "mattancheri",
  },
];
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
const AddAc = ({ addAc }) => {
  const initialState = {
    name: "",
    penNumber: "",
    userType: "AC",
    email: "",
    password: "",
    station: "",
    accessLevel: 2,
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
  // const [input, setInput] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
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
    if (!values.password) {
      errors.password = "Password is Required";
    } else if (!pass.test(values.password)) {
      errors.password =
        "password should be atleast 6 char long and must contain one number and special char";
    }
    return errors;
  };

  const onSubmit = async (values) => {
    setSubmitting(true);
    console.log(values);
    setTimeout(() => setSubmitting(false), 5000);
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
                  <h1>Add New ACP</h1>
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
                        <CIcon name="cil-user" />
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
                      name="station"
                      id="SelectLm"
                      {...formik.getFieldProps("station")}
                    >
                      {subdivisions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </CSelect>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>Duty Status</CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect
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
                      Add ACP
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
AddAc.propTypes = {
  addAc: PropTypes.func.isRequired,
};

export default connect(null)(AddAc);
