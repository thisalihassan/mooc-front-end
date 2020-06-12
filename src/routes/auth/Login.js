import React, { Fragment, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import "./App.css";
import Logo from "./logoMOOC.png";
import Log from "./log.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { login } from "../../redux/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
export const Login = ({ history, login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("loginUser").disabled = true;
    const out = await login(email, password);
    if (!out) {
      setFormData({ email: "", password: "" });
      document.getElementById("loginUser").disabled = false;
    }
  };

  if (isAuthenticated) {
    history.push("/");
    window.location.reload(false);
  }
  return (
    <Fragment>
      <div className="wrapper">
        <div className="ok">
          <Image className="Log" src={Log}></Image>
        </div>
        <div className="form-wrapper">
          <Image className="Logo" src={Logo}></Image>
          <h1>WELCOME BACK!</h1>
          <Form className="login-form" onSubmit={(e) => onSubmit(e)}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                placeholder="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <Button id="loginUser" className="btn-lg btn-block">
              Login
            </Button>
            <div className="text-center pt-3">
              <Link to="/register">
                <h6> Or Create Account</h6>
              </Link>
              <Link to="/forgot">
                <h6> Forgot your password?</h6>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  history: PropTypes.object,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default withRouter(connect(mapStateToProps, { login })(Login));
