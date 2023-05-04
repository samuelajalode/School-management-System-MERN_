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
import axios from "../../store/axios";
import { useForm } from "react-hook-form";
import { errorAlert } from "../../utils";
import { useParams, Link } from "react-router-dom";
import { handleLogin } from "../../store/apiCall";

const Login = ({ history }) => {
  const { id } = useParams();
  const [confirmpass, setconfirmpass] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const handleSignin = () => {
    setloading(true);
    axios
      .post("/resetpassword", { token: id, password })
      .then((res) => {
        const { data } = res;
        setloading(false);
        if (data.error) {
          errorAlert(data.error);
          return 0;
        }
        const user = data?.user;
        handleLogin(user);
        history.push("/");
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
                    <h1>Reset Password</h1>
                    <p className="text-muted">Enter your new password</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <input
                        value={password}
                        className="form-control  col-6"
                        name="password"
                        ref={register({ required: true, minLength: 6 })}
                        onChange={(e) => setpassword(e.target.value)}
                        type="password"
                        required
                        placeholder="Enter Password"
                      />
                      <br />
                    </CInputGroup>
                    {errors.password && (
                      <span className=" form-error text-danger mb-2">
                        Password is required with at least 6 characters
                      </span>
                    )}
                    <CInputGroup className="mb-2">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <input
                        type="password"
                        className="form-control  col-6"
                        placeholder="Confirm password"
                        name="confirmpass"
                        ref={register({
                          required: true,
                          validate: (value) => value === password,
                        })}
                        value={confirmpass}
                        required
                        onChange={(e) => setconfirmpass(e.target.value)}
                      />
                      <br />
                    </CInputGroup>
                    {errors.confirmpass && (
                      <span className="form-error text-danger mb-2">
                        Please confirm password. It should match password
                      </span>
                    )}
                    <CRow className="mb-3">
                      <Link to="/password/forget">Send email Resend Code </Link>
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
                            <>Submit</>
                          )}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
