import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom"
import { useFormik } from "formik";
import { freeSet } from '@coreui/icons';
import action from "../../../redux/actions/api";
import { addUser } from "../../../redux/actions/user";
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
import { Fragment } from "react";

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
const AddAc = ({ addUser }) => {
  const [subdivisions, setSubdivisions] = useState([{ name: "", value: "" }]);
  const [loading, setLoading] = useState(true)
  let history = useHistory()
  useEffect(() => {
    const getPagedetails = async () => {
      try {
        setLoading(true);
        let res = await action.get(`/admin/pageDetails/AC`);
        if (res) {
          setSubdivisions([...res.data]);
          console.log(res.data);
          setLoading(false);
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
    userType: 2,
    phoneNumber: "",
    subdivisionCharge: true,
    designation: "AC",
    email: "",
    password: "",
    subdivision: "",
    specialBrach: "",
    availableLeave: {
      cl: 24,
      other: 0
    },
    dutyStatus: "active",
  };
  const re = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  const pass = new RegExp(/^(?=.*?[#?!@$%^&*-]).{6,}$/);
  const phoneValid = new RegExp(/^[6-9]\d{9}$/);
  // const [input, setInput] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!re.test(values.email)) {
      errors.email = "Invalid Email address";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!phoneValid.test(values.phoneNumber)) {
      errors.phoneNumber = "Invalid Phone Number";
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
    let res = await addUser(values);
    setSubmitting(false);
    if (res) history.push("/acp")

  };
  const formik = useFormik({
    initialValues: initialState,
    onSubmit,
    validate,
  });

  return (
    <Fragment>
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
                        <option value="" disabled hidden>
                          Select Subdivision
                      </option>
                        {subdivisions.map((option) => (
                          <option key={option._id} value={option._id}>
                            {option.name}
                          </option>
                        ))}
                      </CSelect>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText><span style={{ textDecoration: formik.values.subdivisionCharge ? "none" : "line-through" }}>Subdivision Charge</span></CInputGroupText>
                      </CInputGroupPrepend>
                      <CCol md="3">

                      </CCol>
                      <CCol md="3">
                        <CSwitch
                          name="subdivisionCharge"
                          className="mr-1"
                          color="success"
                          {...formik.getFieldProps("subdivisionCharge")}
                          defaultChecked
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
                          disabled
                          type="number"
                          name="availableLeave.cOff"
                          placeholder="C Off Available"
                          {...formik.getFieldProps("availableLeave.cOff")}
                        />
                      </CCol>
                      <CCol md="4">
                        <CLabel>Day Off Available</CLabel>
                        <CInput
                          disabled
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

    </Fragment>

  );
};
export default connect(null, { addUser })(AddAc);
