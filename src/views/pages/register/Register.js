import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../../redux/actions/auth";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const Register = ({ register }) => {
  const initialState = {
    prevEmail: "",
    newEmail: "",
    prevPassword: "",
    newPassword: "",
  };
  const [input, setInput] = useState(initialState);

  const handleChange = (event) => {
    let { name, value } = event.target;
    setInput((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let result = await register(input);
    if (result) {
      setInput(initialState);
    }
  };
  return (
    <div className="flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Admin</h1>
                  <p className="text-muted">Change your Credentials</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="prevEmail"
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      onChange={handleChange}
                      value={input.prevEmail}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="newEmail"
                      type="email"
                      placeholder="New Email"
                      autoComplete="email"
                      onChange={handleChange}
                      value={input.newEmail}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="prevPassword"
                      type="password"
                      onChange={handleChange}
                      value={input.prevPassword}
                      required
                      placeholder="Password"
                      autoComplete="prevoius-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="newPassword"
                      type="password"
                      onChange={handleChange}
                      value={input.newPassword}
                      required
                      placeholder="New Password"
                    />
                  </CInputGroup>
                  <CButton type="submit" color="success" block>
                    Submit
                  </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4"></CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
Register.propTypes = {
  register: PropTypes.func.isRequired,
};

export default connect(null, { register })(Register);
