import React from "react";
// import "./CreateCategory.scss";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getDetailCategory,
} from "../store/actions/CategoryActions";
import {
  convertTextToMoneyInput,
  convertMoneyInputToText,
} from "../store/actions/FunctionActions";
import { toast } from "react-toastify";

class CreateCategory extends React.Component {
  state = {
    category: {
      id: "",
      code: "",
      name: "",
    },
  };
  handleDeleteCategory = async (code) => {
    let category = await deleteCategory(code);
    if (category) {
      this.props.history.push("/admin/category");
    }
  };

  componentDidMount() {
    if (this.props.match.params.code) {
      this.getDetailCategory(this.props.match.params.code);
    }
  }

  getDetailCategory = async (code) => {
    let category = await getDetailCategory(code);
    if (category) {
      this.setState({ category });
    } else {
      this.props.history.push("/admin/category");
    }
  };

  handleSaveCategory = async () => {
    let { category } = this.state;
    if (this.props.match.params.code) {
      category = await updateCategory(category);
      toast.success("Loại Theme đã được cập nhật thành công!");
    } else {
      category = await createCategory(category);
      toast.success("Loại Theme đã được tạo thành công!");
    }

    if (category && category?.id) {
      this.props.history.push("/admin/category");
    }
  };

  render() {
    let { category } = this.state;
    return (
      <>
        <div className="tab-container">
          <div className="list-tabs">
            <div className={`tab-item  active`}>Thông tin</div>
          </div>
          <div className="content">
            <div className={`content-item  active`}>
              <div className="category-container">
                <div className="form-container w--label">
                  <label>Mã:</label>
                  <input
                    className="input"
                    placeholder="Vui lòng nhập mã loại theme"
                    defaultValue={category.code}
                    onChange={(e) => {
                      this.setState({
                        category: {
                          ...category,
                          code: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div className="form-container w--label">
                  <label>Tên:</label>
                  <input
                    className="input"
                    placeholder="Vui lòng nhập tên loại theme"
                    defaultValue={category.name}
                    onChange={(e) => {
                      this.setState({
                        category: {
                          ...category,
                          name: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-btn">
              <button
                className="btn btn-bg-orange-op-5"
                onClick={() => this.handleSaveCategory()}
              >
                Lưu
              </button>
              <button
                className="btn btn-bg-red-op-5"
                onClick={() => this.handleDeleteCategory(category.code)}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CreateCategory;
