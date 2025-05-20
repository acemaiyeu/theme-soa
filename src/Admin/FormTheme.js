import React from "react";
import "./FormTheme.scss";
import "react-quill/dist/quill.snow.css";
import DescriptionComponent from "./DescriptionComponent";
import RequiredComponent from "./RequiredComponent";
import { toast } from "react-toastify";
import axios from "axios";

const url_api_v1 = process.env.REACT_APP_URL_API_V1;
const url_api_v0 = process.env.REACT_APP_URL_API_V0;
const url_api_upload_image = process.env.REACT_APP_URL_API_UPLOAD_FILE;
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
    url_image_temp: null,
    gifts: [],
    categories: [],
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
  handleChangeThumbnail = async (e) => {
    // this.uploadImage(e.target.files[0]);
    await this.uploadImage(e.target.files[0]);

    setTimeout(() => {
      let { url_image_temp } = this.state;
      if (url_image_temp !== null) {
        this.setState({
          theme: {
            ...this.state.theme,
            thumbnail_img: url_image_temp,
          },
          url_image_temp: null,
        });
      }
    }, 1000);
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
  handleAddImageSlider = async (e) => {
    await this.uploadImage(e.target.files[0]);

    setTimeout(() => {
      let { url_image_temp, theme } = this.state;
      console.log(url_image_temp, theme);
      if (url_image_temp !== null) {
        let slider = theme.slider ?? [];
        slider.push(url_image_temp);
        this.setState({
          theme: {
            ...this.state.theme,
            slider: slider,
          },
        });
      }
    }, 1000);
  };
  handleDeleteImageSlider = (index) => {
    let { theme } = this.state;
    theme.slider.splice(index, 1);
    this.setState({
      theme: {
        ...this.state.theme,
        slider: theme.slider,
      },
    });
  };
  handleCategoryChange = (e) => [
    this.setState({
      theme: {
        ...this.state.theme,
        category_id: e.target.value,
      },
    }),
  ];
  handleFrameworkChange = (e) => [
    this.setState({
      theme: {
        ...this.state.theme,
        framework: e.target.value,
      },
    }),
  ];
  handleGiftChange = (e) => [
    this.setState({ theme: { ...this.state.theme, gift: e.target.value } }),
  ];

  uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(url_api_upload_image, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Có thể bỏ dòng này
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });

      this.setState({
        url_image_temp: response.data.url,
      });

      toast.success("Upload thành công!");
      return response.data.filePath;
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
      toast.error(
        error?.response?.data?.message || "Lỗi upload ảnh không xác định"
      );
      return null;
    }
  };
  getGifts = async () => {
    try {
      const response = await axios.get(url_api_v1 + "gifts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });
      this.setState({
        gifts: response.data.data,
        theme: {
          ...this.state.theme,
          gift: response.data.data[0].id,
        },
      });
    } catch (error) {
      console.error("Lỗi get Gifts:", error);
    }
  };
  getCategories = async () => {
    try {
      const response = await axios.get(url_api_v0 + "categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });
      this.setState({
        categories: response.data.data,
      });
    } catch (error) {
      console.error("Lỗi get Gifts:", error);
    }
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
        console.log(err);
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
    if (type === "code") {
      this.setState({
        theme: {
          ...this.state.theme,
          code: value,
        },
      });
    }
    if (type === "title") {
      this.setState({
        theme: {
          ...this.state.theme,
          title: value,
        },
      });
    }
    if (type === "short_description") {
      this.setState({
        theme: {
          ...this.state.theme,
          short_description: value,
        },
      });
    }
    if (type === "link_youtube_demo") {
      this.setState({
        theme: {
          ...this.state.theme,
          link_youtube_demo: value,
        },
      });
    }
    if (type === "price") {
      this.setState({
        theme: {
          ...this.state.theme,
          price: value,
        },
      });
    }
  };

  componentDidMount = async () => {
    await this.getGifts();
    await this.getCategories();
    this.setState({
      theme: {
        ...this.state.theme,
        framework: "Laravel",
      },
    });
  };
  render() {
    let isThemeEdit = this.state.theme != null;
    let { theme, gifts, categories } = this.state;
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
                <label>Mã: </label>
                <input
                  type="text"
                  defaultValue={this.state?.theme?.code ?? ""}
                  placeholder="Nhập code"
                  onChange={(e) => this.setValue("code", e.target.value)}
                />
              </div>
              <div className="form-content-item">
                <label>Title: </label>
                <input
                  type="text"
                  defaultValue={this.state?.theme?.title ?? ""}
                  placeholder="Nhập title"
                  onChange={(e) => this.setValue("title", e.target.value)}
                />
              </div>

              <div className="form-content-item --form-content-item">
                <label>Thumbnail: </label>
                <input
                  type="file"
                  placeholder="Nhập title"
                  value={this.state?.thumbnail ?? ""}
                  onChange={(e) => this.handleChangeThumbnail(e)}
                />
              </div>
              <div className="form-content-item">
                <label>Giá: </label>
                <input
                  type="number"
                  min={0}
                  defaultValue={this.state?.theme?.price ?? ""}
                  placeholder="Nhập Giá"
                  onChange={(e) => this.setValue("price", e.target.value)}
                />
              </div>
              <div className="form-content-item">
                <label>Link youtube demo: </label>
                <input
                  type="text"
                  defaultValue={this.state?.theme?.link_youtube_demo ?? ""}
                  placeholder="Nhập Link demo"
                  onChange={(e) =>
                    this.setValue("link_youtube_demo", e.target.value)
                  }
                />
              </div>
              <div className="form-content-item">
                <label>Responsive: </label>
                <input
                  type="text"
                  defaultValue={this.state?.theme?.responsive ?? ""}
                  placeholder="Tablet, Mobile"
                  onChange={(e) => this.setValue("responsive", e.target.value)}
                />
              </div>

              {/* <div className="form-content-item --form-content-item">
                <label>Img Slider: </label>
                <div className="list-img">
                  {theme.slider &&
                    theme.slider.length > 0 &&
                    theme.slider.map((item, index) => {
                      return (
                        <div className="img-item" key={index}>
                          <img src={item} alt="thumbnail" />
                          <i
                            class="bi bi-x-circle icon-close"
                            onClick={() => this.handleDeleteImageSlider(index)}
                          ></i>
                        </div>
                      );
                    })} */}

              {/* <i class="bi bi-plus-circle"></i> */}
              {/* 
                  <label htmlFor="file-upload">
                    <i className="bi bi-plus-circle"></i>
                  </label>
                  <input
                    id="file-upload"
                    multiple
                    onChange={(e) => this.handleAddImageSlider(e)}
                    accept="image/png"
                    type="file"
                  />
                </div>
              </div> */}

              <div className="form-content-item">
                <label>Framework: </label>
                <select onChange={(e) => this.handleFrameworkChange(e)}>
                  <option value="Laravel">Laravel</option>
                  <option value="SpringBoot">SpringBoot</option>
                  <option value="JavaSwing">JavaSwing</option>
                  <option value="ReactJS">ReactJS</option>
                </select>
              </div>
              <div className="form-content-item">
                <label>Quà: </label>
                <select onChange={(e) => this.handleGiftChange(e)}>
                  {gifts && gifts.length > 0 ? (
                    gifts.map((item, index) => {
                      return (
                        <option
                          key={item.id}
                          selected={this.state?.theme?.gift === item.id}
                          value={item.id}
                        >
                          {item.title}
                        </option>
                      );
                    })
                  ) : (
                    <option>Không thấy quà</option>
                  )}

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
                  onChange={(e) =>
                    this.setValue("short_description", e.target.value)
                  }
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
                {/* <select>
                  <option>Project laravel API</option>
                  <option>Cấu trúc và dữ liệu MYSQL</option>
                  <option>Theme React</option>
                  <option>Theme Netbean</option>
                  <option>Theme Spring boot</option>
                </select> */}
                <select onChange={(e) => this.handleCategoryChange(e)}>
                  {categories && categories.length > 0 ? (
                    categories.map((item, index) => {
                      return (
                        <option
                          key={index}
                          selected={item.id === this.state.theme.category_id}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })
                  ) : (
                    <option>Không thấy danh mục</option>
                  )}
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
                <label>Yêu cầu hệ thống: </label>
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
