import React from "react";
import ReactDOM from "react-dom";
import Basic, { validateEmail } from "../routes/auth/forgot";
import { validatePassword } from "../routes/auth/forgot";
import { validatePasscode } from "../routes/auth/forgot";
import { AddCourse } from "../containers/wizard/Basic";
import { IntlProvider } from "react-intl";
import LoginClass, { Login } from "../routes/auth/Login";
import { DetailsPages } from "../routes/myCourses/details";
import { BrowserRouter as Router } from "react-router-dom";
import { configure, shallow } from "enzyme";
import RegClass, { Register, validate } from "../routes/auth/Register";
import { createMockStore } from "redux-test-utils";
import { login } from "../redux/actions";
import AppLocale from "../lang";
const testState = { auth: { isAuthenticated: false } };
const store = createMockStore(testState);
const defaultLocale = "en";
const currentAppLocale = AppLocale[defaultLocale];

describe("Login TestCases", () => {
  let wrapper;
  it("It is email", () => {
    const state = "ali-hassan01@outlook.com";
    const newState = validateEmail(state);
    expect(newState).to.equal();
  });
  it("It is not an email", () => {
    const state = "ali-hassan01outlook.com";
    const newState = validateEmail(state);
    expect(newState).to.equal("Invalid email address");
  });

  it("emailset", () => {
    wrapper = shallow(<Login />);
    wrapper.find('Input[name="email"]').simulate("Change", {
      target: { name: "email", value: "ali-hassan01outlook.com" },
    });
    expect(wrapper.find('Input[name="email"]').props().value).equal(
      "ali-hassan01outlook.com"
    );
  });
  // before(() => {});

  it("login check with wrong data", () => {
    wrapper = mount(
      <Router>
        <LoginClass store={store} />
      </Router>
    );
    wrapper.find('Input[name="email"]').simulate("change", {
      target: { name: "email", value: "ali-hassan01@outlook.com" },
    });
    wrapper.find('Input[name="password"]').simulate("change", {
      target: { name: "password", value: "kalicifer" },
    });
    wrapper.find('Button[className="btn-lg btn-block"]').simulate("click");
    expect(login("ali-hassan01@outlook.com", "kalicifer")).to.not.be.null;
  });

  it("User Name", () => {
    wrapper = mount(<Register />);
    wrapper.find('input[name="name"]').simulate("change", {
      target: { name: "name", value: "krishankantsinghal" },
    });
    expect(wrapper.state("name")).equal("krishankantsinghal");
  });
});
describe("Regiter TestCases", () => {
  let wrapper;
  it("Checking that the fields in form are working correct", () => {
    wrapper = mount(<Register />);
    wrapper.find('input[name="name"]').simulate("change", {
      target: { name: "name", value: "krishankantsinghal" },
    });
    expect(wrapper.state("name")).equal("krishankantsinghal");
    wrapper.find('input[name="email"]').simulate("change", {
      target: { name: "email", value: "krishankantsinghalyahoo.com" },
    });
    expect(wrapper.state("email")).equal("krishankantsinghalyahoo.com");
    wrapper.find('input[name="password"]').simulate("change", {
      target: { name: "password", value: "12345678" },
    });
    expect(wrapper.state("password")).equal("12345678");
    wrapper.find('input[name="cpassword"]').simulate("change", {
      target: { name: "cpassword", value: "12345678" },
    });
    expect(wrapper.state("cpassword")).equal("12345678");
    // wrapper.find('input[type="select"]').simulate("change", {
    //   target: { name: "roll", value: "Teacher", type: "select" }
    // });
    // expect(wrapper.state("roll")).equal("Teacher");
  });
});
describe("forgot password testcases", () => {
  // it("UI testing", function() {
  //   const wrapper = shallow(<Basic />);
  //   const welcome = "<h1 className='head'>RESET YOUR PASSWORD</h1>";
  //   expect(wrapper.contains(welcome)).to.equal(true);
  // });
  it("UI testing 2", function () {
    const wrapper = mount(
      <Router>
        <LoginClass store={store} />
      </Router>
    );
    const a = wrapper.find("h1").text();
    expect(a).to.equal("WELCOME BACK!");
  });
  it("it is email", function () {
    let wrapper;
    const state = "nabba.asif@gmail.com";
    const newState = validateEmail(state);
    expect(newState).to.equal();
  });
  it("Password check", function () {
    let wrapper;
    const state = "12wetyhjnn";
    const newState = validatePassword(state);
    expect(newState).to.equal();
  });
  it("Passcode check", function () {
    let wrapper;
    const state = "12wetyhn";
    const newState = validatePasscode(state);
    expect(newState).to.equal();
  });
});

describe("My COurses TestCases", () => {
  let wrapper;
  // it("course name", () => {
  //   const wrapper = mount(
  //     <IntlProvider
  //       locale={currentAppLocale.locale}
  //       messages={currentAppLocale.messages}
  //     >
  //       <Router>
  //         {" "}
  //         <AddCourse store={store} />
  //       </Router>
  //     </IntlProvider>
  //   );
  //   const component = wrapper.instance();
  //   wrapper.find('Input[name="name"]').simulate("change", {
  //     target: { name: "name", value: "Artificial intelligence" }
  //   });
  //   expect(wrapper.state("name")).equal("Artificial intelligence");
  // });
  it("Course detail page UI testing", function () {
    const wrapper = mount(
      <Router>
        <DetailsPages store={store} />
      </Router>
    );
    const a = wrapper.find("Label").text();
    expect(a).to.equal("Lecture Description");
  });
});
