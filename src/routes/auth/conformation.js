import React, { Fragment, useState } from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import Logo from "./logoMOOC.png";
import Log from "./log.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { conformtion } from "../../redux/actions";
import { connect } from "react-redux";
import queryString from "query-string";
import PropTypes from "prop-types";
const Conformation = ({ history, conformtion, isAuthenticated, location }) => {
  const [formData, setFormData] = useState({
    token: null,
  });
  const { token } = formData;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const values = queryString.parse(location.search);
    if (values.id) {
      conformtion(values.id, token);
    }
    this.authentication();
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
              <Label>Conformation</Label>
              <Input
                placeholder="Token"
                type="text"
                name="token"
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <Button className="btn-lg btn-block">Confirm</Button>
            <div className="text-center pt-3">
              or continue with your social account
            </div>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};
Conformation.propTypes = {
  conformtion: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
const mapStateToProps = ({ auth }) => {
  const { isAuthenticated } = auth;
  return { isAuthenticated };
};

export default withRouter(
  connect(mapStateToProps, {
    conformtion,
  })(Conformation)
);
