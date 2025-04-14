import React from "react";
import "./FormTheme.scss";
import "react-quill/dist/quill.snow.css";
import DescriptionComponent from "./DescriptionComponent";
import RequiredComponent from "./RequiredComponent";
import { toast } from "react-toastify";
import { url_api_v1 } from "../config";
import axios from "axios";
// const modules = {
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["link", "image"],
//     ["clean"],
//   ],
// };

class FormTheme extends React.Component {
  state = {
    value: "",
    setValue: "",
    theme: null,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.setState({ theme: this.props.theme });
    }
  }

  isRealValue = (obj) => {
    return obj && obj !== "null" && obj !== "undefined";
  };

  handleClosedModal = () => {
    this.setState({
      theme: null,
    });
  };

  // Hàm riêng cho long_description
  handleLongDescriptionChange = (content) => {
    this.setState((prevState) => ({
      theme: {
        ...prevState.theme,
        long_description: content,
      },
    }));
  };

  // Hàm riêng cho document
  handleDocumentChange = (content) => {
    this.setState((prevState) => ({
      theme: {
        ...prevState.theme,
        document: content,
      },
    }));
  };

  handleGetHTML = () => {
    const html = this.descriptionRef.current?.getHTML();
    console.log("Current HTML:", html);
  };

  handleSaveTheme = () => {
    console.log(this.state.theme);
    axios
      .post(url_api_v1 + "theme", this.state.theme, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admin_token"),
        },
      })
      .then((res) => {
        this.props.saveTheme(res.data);
        toast.success("Theme đã được lưu thành công!");

        this.props.handleClick(undefined);
        this.setState({ theme: null });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  setValue = (type, value) => {
    if (type === "file") {
      this.setState({
        theme: {
          ...this.state.theme,
          file: value,
        },
      });
    }
  };

  render() {
    let isThemeEdit = this.state.theme != null;
    return (
      <>
        {isThemeEdit && (
          <div className="form-theme">
            <div className="form-header">
              <div className="thumbnail-img">
                <img
                  src={this.state?.theme?.thumbnail_img ?? ""}
                  alt="thumbnail"
                />
              </div>
              <i
                className="bi bi-x-circle icon-close"
                onClick={() => this.handleClosedModal()}
              ></i>
            </div>

            <div className="form-content">
              <div className="form-content-item">
                <label>Title: </label>
                <input
                  type="text"
                  value={this.state?.theme?.title ?? ""}
                  placeholder="Nhập title"
                />
              </div>

              <div className="form-content-item --form-content-item">
                <label>Thumbnail: </label>
                <input
                  type="file"
                  placeholder="Nhập title"
                  value={this.state?.thumbnail ?? ""}
                />
              </div>

              <div className="form-content-item --form-content-item">
                <label>Img Slider: </label>
                <div className="list-img">
                  {/* <img
                    src="https://media.istockphoto.com/id/1177199065/photo/african-lion-and-night-in-africa-banner-savannah-landscape-theme-king-of-animals-proud.jpg?s=612x612&w=0&k=20&c=I6zG27ksq2_4rBjLCN8kQMuiBysPA_rnfurxbGsP8BE="
                    alt="thumbnail"
                  />
                   */}
                  {/* <i class="bi bi-plus-circle"></i> */}

                  <label htmlFor="file-upload">
                    <i className="bi bi-plus-circle"></i>
                  </label>
                  <input id="file-upload" multiple typeof="png" type="file" />
                </div>
              </div>

              <div className="form-content-item">
                <label>Framework: </label>
                <select>
                  <option>Laravel</option>
                  <option>SpringBoot</option>
                  <option>JavaSwing</option>
                </select>
              </div>
              <div className="form-content-item">
                <label>Quà: </label>
                <select>
                  <option>Miễn phí video hướng dẫn cài đặt</option>
                  {/* <option>SpringBoot</option>
                  <option>JavaSwing</option> */}
                </select>
              </div>
              {/* <div className="form-content-item">
                <label>Framework: </label>
                <select>
                  <option>Laravel</option>
                  <option>SpringBoot</option>
                  <option>JavaSwing</option>
                </select>
              </div> */}
              <div className="form-content-item">
                <label>Mô tả ngắn: </label>
                <input
                  type="text"
                  defaultValue={this.state?.theme?.short_description ?? ""}
                  placeholder="Nhập mô tả ngắn"
                />
              </div>

              <div className="form-content-item">
                <label>Link file: </label>
                <input
                  type="text"
                  defaultValue={this.state?.theme?.file ?? ""}
                  placeholder="Nhập link file"
                  onChange={(e) => this.setValue("file", e.target.value)}
                />
              </div>

              {/* <div className="form-content-item --form-content-item">
                <label>Thư viện: </label>
                <textarea placeholder="Nhập thư viện sử dụng" />
              </div> */}

              <div className="form-content-item">
                <label>Danh mục: </label>
                <select>
                  <option>Project laravel API</option>
                  <option>Cấu trúc và dữ liệu MYSQL</option>
                  <option>Theme React</option>
                  <option>Theme Netbean</option>
                  <option>Theme Spring boot</option>
                </select>
              </div>

              <div className="form-content-item --form-content-item">
                <label>Mô tả: </label>
                <DescriptionComponent
                  value={this.state.theme.long_description}
                  onChange={this.handleLongDescriptionChange}
                />
              </div>

              <div className="form-content-item --form-content-item">
                <label>Hướng dẫn cài đặt: </label>
                <RequiredComponent
                  value={this.state.theme.document}
                  onChange={this.handleDocumentChange}
                />
              </div>

              <div
                className="container-button"
                onClick={() => this.handleSaveTheme()}
              >
                <div className="btn-default btn-bg-green-op-5 ">
                  <div className="btn-default-icon ">
                    <i className="bi bi-file-earmark"></i>
                  </div>
                  <div className="btn-default-text">Lưu</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default FormTheme;
