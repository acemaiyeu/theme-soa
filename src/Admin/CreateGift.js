import React from "react";
// import "./Creategift.scss";
import {
  createGift,
  updateGift,
  deleteGift,
  getDetailGift,
} from "../store/actions/GiftActions";
import { toast } from "react-toastify";

class CreateCoupon extends React.Component {
  state = {
    gift: {
      details: [{ id: "", title: "" }],
    },
    tab: "info",
  };
  handleDeleteGift = async (id) => {
    let gift = await deleteGift(id);
    if (gift) {
      this.props.history.push("/admin/gifts");
    }
  };

  async componentDidMount() {
    if (this.props.match.params.id) {
      await this.getDetailGift(this.props.match.params.id);
    }
  }
  getDetailGift = async (id) => {
    let gift = await getDetailGift(id);
    if (gift) {
      this.setState({ gift });
    } else {
      this.props.history.push("/admin/gifts");
    }
  };

  handleSaveGift = async () => {
    let { gift } = this.state;
    if (this.props.match.params.id) {
      gift = await updateGift(gift);
      toast.success("Quà đã được cập nhật thành công!");
      this.props.history.push("/admin/gifts");
    } else {
      gift = await createGift(gift);
      toast.success("Quà đã được tạo thành công!");
      this.props.history.push("/admin/gifts");
    }

    if (gift && gift?.id) {
      this.props.history.push("/admin/gifts");
    }
  };

  handleTitleDetail = (value, index) => {
    let { gift } = this.state;
    if (gift && gift?.details) {
      let details = [...gift.details];
      details[index].title = value;
      this.setState({ gift: { ...gift, details } });
    }
  };

  handleAddDetail = () => {
    let { gift } = this.state;
    if (gift && gift?.details) {
      let details = [...gift?.details];
      details.push({
        id: "",
        title: "",
      });
      this.setState({ gift: { ...gift, details } });
    }
  };

  render() {
    let { gift, tab } = this.state;
    return (
      <>
        <div className="tab-container">
          <div className="list-tabs">
            <div
              className={`tab-item ${tab === "info" ? "active" : ""}`}
              onClick={() => this.setState({ tab: "info" })}
            >
              Thông tin
            </div>
            <div
              className={`tab-item ${tab === "detail" ? "active" : ""}`}
              onClick={() => this.setState({ tab: "detail" })}
            >
              Chi tiết
            </div>
          </div>
          <div className="content">
            <div className={`content-item ${tab === "info" ? "active" : ""}`}>
              <div className="coupon-container">
                <div className="form-container w--label">
                  <label>Tên:</label>
                  <input
                    className="input"
                    placeholder="Vui lòng nhập tên quà"
                    value={gift.title}
                    onChange={(e) => {
                      this.setState({
                        gift: {
                          ...gift,
                          title: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={`content-item ${tab === "detail" ? "active" : ""}`}>
              <div className="condition-container w--label">
                {gift.details &&
                  gift.details.length > 0 &&
                  gift.details.map((item, index) => {
                    return (
                      <div className="condition-item w--label" key={item.id}>
                        <div className="form-container w--label">
                          <label>Title: </label>

                          <input
                            className="input"
                            placeholder="Vui lòng nhập giá trị"
                            type="text"
                            value={item.title ?? ""}
                            onChange={(e) =>
                              this.handleTitleDetail(e.target.value, index)
                            }
                          />
                        </div>

                        <div className="btn-container">
                          <button
                            className={`btn btn-bg-violet-op-5 ${
                              index < gift.details?.length - 1 &&
                              "none-visabled"
                            }`}
                            onClick={() => this.handleAddDetail(index)}
                          >
                            Thêm chi tiết
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="form-btn">
              <button
                className="btn btn-bg-orange-op-5"
                onClick={() => this.handleSaveGift()}
              >
                Lưu
              </button>
              <button
                className="btn btn-bg-red-op-5"
                onClick={() => this.handleDeleteGift(gift.code)}
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

export default CreateCoupon;
