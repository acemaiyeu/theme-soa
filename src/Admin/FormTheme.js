import React, { useState } from "react";
import "./FormTheme.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

class FormTheme extends React.Component {
  
  state = {
    value: "",
    setValue: "",
    theme: {},
  };

  componentDidUpdate(prevProps) {
    console.log(this.props);
    if (prevProps.theme !== this.props.theme) {
      this.setState({ theme: this.props.theme });
    }
  }
  render() {
    const { value, setValue } = this.state;

    return (
      <div className="form-theme">
        <div className="form-header">
          <div className="thumbnail-img">
            <img
              src="https://media.istockphoto.com/id/1177199065/photo/african-lion-and-night-in-africa-banner-savannah-landscape-theme-king-of-animals-proud.jpg?s=612x612&w=0&k=20&c=I6zG27ksq2_4rBjLCN8kQMuiBysPA_rnfurxbGsP8BE="
              alt="thumbnail"
            ></img>
          </div>
          <i className="bi bi-x-circle icon-close"></i>
        </div>

        <div className="form-content">
          <div className="form-content-item">
            <label>Title: </label>
            <input type="text" placeholder="Title" />
          </div>

          <div className="form-content-item">
            <label>Framework: </label>
            <select>
              <option>Laravel</option>
              <option>SpringBoot</option>
              <option>JavaSwing</option>
            </select>
          </div>

          <div className="form-content-item --form-content-item">
            <label>Framework: </label>
            <ReactQuill theme="snow" value={value} setValue={setValue} />
          </div>
        </div>
      </div>
    );
  }
}

export default FormTheme;
