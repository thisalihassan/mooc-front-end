import React, { Fragment, Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "./App.css";
import Log from "./login.svg";
import { Formik, Form } from "formik";
import { Image } from "react-bootstrap";
import { Input, Button, NavItem } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { register } from "../../redux/actions";
export function validate(values) {
  let errors;
  if (!values) {
    errors = "Please enter a title";
  }
  if (values) {
    if (values.length < 5) {
      errors = "Name must be greater than 5";
    }
  }

  return errors;
}

//VALIDATION

export class Register extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: "",
      email: "",
      password: "",
      roll: "",
      cpassword: "",
    };
  }

  handleSubmit(values) {
    const { name, password, roll, email } = this.state;
    this.props.register({ name, email, roll, password });
    if (this.props.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  validate(values) {
    const { name, password, roll, cpassword } = this.state;
    let errors = {};
    console.log(this.state);
    if (!name) {
      errors.name = "Please enter a title";
    }
    if (name) {
      if (name.length < 5) {
        errors.name = "Name must be greater than 5";
      }
    }

    if (!password) {
      errors.password = "Please enter a password ";
    }
    if (cpassword) {
      if (cpassword !== password) {
        errors.cpassword = "Please match your password";
      }
    }
    if (!cpassword) {
      errors.cpassword = "Please enter a password ";
    }

    if (!roll) {
      errors.roll = "Please Select a roll";
    }

    return errors;
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <Fragment>
        <div className="wrapper">
          <div className="ok">
            <Image className="Log" src={Log}></Image>
          </div>
          <div className="form-wrapper">
            <h1>Be A Part Of Us!</h1>
            <Formik
              validate={this.validate}
              initialValues={{
                name: "",
                email: "",
                password: "",
                cpassword: "",
                roll: "",
              }}
              onSubmit={this.handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="firstName">
                    <label htmlFor="name">User Name</label>
                    <Input
                      placeholder="User Name"
                      type="text"
                      name="name"
                      onChange={(val) => {
                        this.setState({ name: val.target.value });
                      }}
                    />
                    {errors.name && touched.name && (
                      <div className="invalid-feedback d-block">
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div className="email">
                    <label htmlFor="email">Email</label>
                    <Input
                      placeholder="Email"
                      type="email"
                      name="email"
                      onChange={(val) => {
                        this.setState({ email: val.target.value });
                      }}
                    />
                  </div>
                  <div className="password">
                    <label htmlFor="password">Password</label>
                    <Input
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={(val) => {
                        this.setState({ password: val.target.value });
                      }}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div className="password">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <Input
                      placeholder="Password"
                      type="password"
                      name="cpassword"
                      onChange={(val) => {
                        this.setState({ cpassword: val.target.value });
                      }}
                    />
                    {errors.cpassword && touched.cpassword && (
                      <div className="invalid-feedback d-block">
                        {errors.cpassword}
                      </div>
                    )}
                  </div>
                  <div className="password">
                    <label htmlFor="roll">Your Role?</label>
                    <Input
                      type="select"
                      name="roll"
                      defaultValue="Student"
                      onChange={(val) => {
                        this.setState({ roll: val.target.value });
                      }}
                    >
                      <option>Teacher</option>
                      <option>Student</option>
                    </Input>

                    {errors.roll && touched.roll && (
                      <div className="invalid-feedback d-block">
                        {errors.roll}
                      </div>
                    )}
                  </div>
                  <div className="createAccount">
                    <Button className="btn-lg btn-block" type="submit">
                      Create Account
                    </Button>
                    <Link to="/login">Already Have an Account?</Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { isAuthenticated } = auth;
  return { isAuthenticated };
};

export default withRouter(
  connect(mapStateToProps, {
    register,
  })(Register)
);
