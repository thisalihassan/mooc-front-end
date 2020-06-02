import React from "react";
import { FormGroup, Label, CustomInput, Form, Button } from "reactstrap";
import IntlMessages from "../../util/IntlMessages";

const CustomInputExample = () => {
  return (
    <Form>
      <FormGroup>
        <Label for="exCustomCheckbox">
          <h3>
            {" "}
            <IntlMessages id="form-components.checkboxes" />
          </h3>
        </Label>
        <br></br>
        <div>
          <CustomInput type="checkbox" id="exCustomCheckbox">
            <IntlMessages id="form-components.privacy1" />
          </CustomInput>

          <br></br>
          <CustomInput type="checkbox" id="exCustomCheckbox2">
            <IntlMessages id="form-components.privacy2" />
          </CustomInput>

          <br></br>
          <br></br>
          <Button>Submit</Button>
        </div>
      </FormGroup>
    </Form>
  );
};

export default CustomInputExample;
