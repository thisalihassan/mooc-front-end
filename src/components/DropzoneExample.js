import React, { Component } from "react";
import DropzoneComponent from "react-dropzone-component";
import "dropzone/dist/min/dropzone.min.css";
import axios from "axios";
import { URL, config } from "../constants/defaultValues";
import { ImagefileTypes } from "../constants/defaultValues";
var ReactDOMServer = require("react-dom/server");

var dropzoneComponentConfig = {
  acceptedFiles: "image/png,image/jpg,image/jpeg",
  postUrl: URL + "upload",
};
var dropzoneConfig = {
  acceptedFiles: "image/png,image/jpg,image/jpeg",
  thumbnailHeight: 160,
  maxFilesize: 2,
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview mb-3">
      <div className="d-flex flex-row ">
        <div className="p-0 w-30 position-relative">
          <div className="dz-error-mark">
            <span>
              File error
              <i />
            </span>
          </div>
          <div className="dz-success-mark">
            <span>
              <i />
            </span>
          </div>
          <div className="preview-container">
            {/*  eslint-disable-next-line jsx-a11y/alt-text */}
            <img data-dz-thumbnail className="img-thumbnail border-0" />
            <i className="simple-icon-doc preview-icon" />
          </div>
        </div>
        <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
          <div>
            <span data-dz-name />
          </div>
          <div className="text-primary text-extra-small" data-dz-size />
          <div className="dz-progress">
            <span className="dz-upload" data-dz-uploadprogress />
          </div>
          <div className="dz-error-message">
            <span data-dz-errormessage />
          </div>
        </div>
      </div>
      <a href="#/" className="remove" data-dz-remove>
        <i className="glyph-icon simple-icon-trash" />
      </a>
    </div>
  ),
  headers: { "My-Awesome-Header": "header value" },
};

class DropzoneExample extends Component {
  //
  eventHandlers = {
    addedfile: async (file) => {
      const format = file.name.split(".")[1].toLowerCase();
      const match = ImagefileTypes.find((i) => i === format);
      if (match) {
        const formData = new FormData();
        formData.append("file", file);
        const configg = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        const res = await axios.post(URL + "upload", formData, configg);
        const avatar = res.data;
        const body = JSON.stringify({ avatar });
        console.log(avatar);
        axios.post(URL + "api/auth/avatar", body, config);
      }
    },
  };

  render() {
    return (
      <DropzoneComponent
        config={dropzoneComponentConfig}
        djsConfig={dropzoneConfig}
        eventHandlers={this.eventHandlers}
      />
    );
  }
}

export default DropzoneExample;
