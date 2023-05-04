import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import axios from "../../store/axios";
import { useForm } from "react-hook-form";
import { errorAlert, successAlert, getEmailPattern } from "../../utils";

const Login = () => {
  const [userId, setuserId] = useState("");
  const [isSend, setisSend] = useState(false);
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const handleSignin = () => {
    setloading(true);
    axios
      .post("/forgetpassword", { userID: userId, email })
      .then((res) => {
        const { data } = res;
        setloading(false);
        if (data.error) {
          console.log(data);
          errorAlert(data.error);
          return 0;
        }
        successAlert(`Email has been send to ${email} `);
        setisSend(true);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("Connection  error try again later");
      });
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Forget Password</h1>
                    <p className="text-muted">
                      Enter your email and you will receive an email to reset
                      password
                    </p>
                    <CInputGroup className="mb-2">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <input
                        value={userId}
                        className="form-control  col-6"
                        name="userId"
                        ref={register({ required: true })}
                        onChange={(e) => setuserId(e.target.value)}
                        type="text"
                        required
                        placeholder="ID"
                        autoComplete="username"
                      />
                      <br />
                    </CInputGroup>
                    {errors.userId && (
                      <p className="d-flex form-error text-danger mb-2">
                        This field is required
                      </p>
                    )}
                    <CInputGroup className="mb-2">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <input
                        type="email"
                        className="form-control  col-6"
                        placeholder="Email"
                        name="email"
                        ref={register({
                          required: true,
                          pattern: getEmailPattern(),
                        })}
                        value={email}
                        required
                        onChange={(e) => setemail(e.target.value)}
                        autoComplete="current-password"
                      />
                      <br />
                    </CInputGroup>
                    {errors.email && (
                      <span className="form-error text-danger mb-2">
                        Valid email is required
                      </span>
                    )}
                    <p>
                      {isSend && (
                        <p>
                          If you haven't received the email Click resend button
                          below
                        </p>
                      )}
                    </p>
                    <CRow>
                      <CCol className="mb-3">
                        <Link to="/login">Login in your account</Link>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          disabled={loading}
                          onClick={handleSubmit(handleSignin)}
                          type="submit"
                          color="primary"
                          className="px-4"
                        >
                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </>
                          ) : (
                            <>{isSend ? "Resend" : "Submit"}</>
                          )}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* 
              <CCard
               
              > */}
              {/* <CCardBody className="text-center">
                  <div>
                    <img src={logo} alt="logo" />
                    <h2>Welcome Back</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </CCardBody> */}
              {/* </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
