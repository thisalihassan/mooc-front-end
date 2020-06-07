import React from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../CustomSelectInput";

const AddNewModal = ({ modalOpen, toggleModal, categories }) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>Add New Item</ModalHeader>
      <ModalBody>
        <Label>Name</Label>
        <Input />
        <Label className="mt-4">Category</Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          options={categories}
        />
        <Label className="mt-4">Description</Label>
        <Input type="textarea" name="text" id="exampleText" />
        <Label className="mt-4">Status</Label>
        <CustomInput type="radio" id="exCustomRadio" name="customRadio" />
        <CustomInput type="radio" id="exCustomRadio2" name="customRadio" />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          Cancel
        </Button>
        <Button color="primary" onClick={toggleModal}>
          Submit
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default AddNewModal;
