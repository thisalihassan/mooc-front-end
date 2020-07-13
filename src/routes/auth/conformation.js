import React, { Fragment, useState } from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import Logo from "./logoMOOC.png";
import Log from "./log.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { conformtion, resendconformtion } from "../../redux/actions";
import { connect } from "react-redux";
import queryString from "query-string";
import PropTypes from "prop-types";
import { URL, config } from "../../constants/defaultValues";
import axios from "axios";
const Conformation = ({
  history,
  conformtion,
  resendconformtion,
  registrationSucess,
  location,
}) => {
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
  };
  const resendConfirmationCode = async (e) => {
    e.preventDefault();
    const values = queryString.parse(location.search);
    if (values.id) {
      const id = values.id;
      resendconformtion(id);
    }
  };
  if (registrationSucess) {
    history.push("/login");
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
            <br></br>
            <Button
              onClick={(e) => resendConfirmationCode(e)}
              className="btn btn-sm btn-block"
            >
              Resend Confirmation
            </Button>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};
Conformation.propTypes = {
  resendconformtion: PropTypes.func.isRequired,
  conformtion: PropTypes.func.isRequired,
  registrationSucess: PropTypes.bool,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
const mapStateToProps = ({ auth }) => {
  const { registrationSucess } = auth;
  return { registrationSucess };
};

export default withRouter(
  connect(mapStateToProps, {
    conformtion,
    resendconformtion,
  })(Conformation)
);
