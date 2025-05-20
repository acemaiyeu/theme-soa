import React from "react";
import "./CreateCoupon.scss";
import {
  getThemesForPromotion,
  convertDateTime,
} from "../store/actions/ThemeActions";
import {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getDetailCoupon,
} from "../store/actions/CouponActions";
import {
  convertTextToMoneyInput,
  convertMoneyInputToText,
} from "../store/actions/FunctionActions";
import { toast } from "react-toastify";

class CreateCoupon extends React.Component {
  state = {
    coupon: {
      id: "",
      code: "",
      name: "",
      active: 0,
      start_date: "",
      end_date: "",
      condition_apply: "ALL",
      condition_info: "",
      data: {
        discount_for: "cart",
        discount_type: "price",
        theme_id: "",
        value: 0,
        condition_type: "all",
        limit: "",
      },
      conditions: [
        {
          id: "",
          condition_apply: "cart",
          condition_data: {
            theme_type: "all",
            theme_id: "",
            value: 0,
            condition_type: "number",
            condition: ">",
          },
        },
      ],
    },
    themes: [],
    tab: "info",
  };
  handleDeleteCoupon = async (code) => {
    let coupon = await deleteCoupon(code);
    if (coupon) {
      this.props.history.push("/admin/coupons");
    }
  };
  getThemesForPromotion = async (params = "") => {
    let themes = await getThemesForPromotion(params);
    this.setState({ themes });
  };
  componentDidMount() {
    let products = getThemesForPromotion();
    this.setState({ products });
    if (this.props.match.params.code) {
      this.getDetailCoupon(this.props.match.params.code);
    }
  }
  getDetailCoupon = async (code) => {
    let coupon = await getDetailCoupon(code);
    if (coupon) {
      this.setState({ coupon });
    } else {
      this.props.history.push("/admin/coupons");
    }
  };

  handleSaveCoupon = async () => {
    let { coupon } = this.state;
    if (this.props.match.params.code) {
      coupon = await updateCoupon(coupon);
      toast.success("Mã giảm giá đã được cập nhật thành công!");
    } else {
      coupon = await createCoupon(coupon);
      toast.success("Mã giảm giá đã được tạo thành công!");
    }

    if (coupon && coupon?.id) {
      this.props.history.push("/admin/coupons");
    }
  };
  handleChangeConditionApplyCondition = (value, index) => {
    let { coupon } = this.state;
    if (coupon && coupon?.conditions) {
      let conditions = [...coupon?.conditions];
      conditions[index].condition_apply = value;

      this.setState({ coupon: { ...coupon, conditions } });
    }
  };
  handleChangeConditionDataCondition = (value, index) => {
    let { coupon } = this.state;
    if (coupon && coupon?.conditions) {
      let conditions = [...coupon?.conditions];
      conditions[index].condition_data.condition = value;
      this.setState({ coupon: { ...coupon, conditions } });
    }
  };
  handleChangeConditionDataValue = (value, index) => {
    let { coupon } = this.state;
    if (coupon && coupon?.conditions) {
      let conditions = [...coupon?.conditions];
      conditions[index].condition_data.value = value;
      this.setState({ coupon: { ...coupon, conditions } });
    }
  };
  handleChangeConditionDataConditionType = (value, index) => {
    let { coupon } = this.state;
    if (coupon && coupon?.conditions) {
      let conditions = [...coupon?.conditions];
      conditions[index].condition_data.condition_type = value;
      this.setState({ coupon: { ...coupon, conditions } });
    }
  };
  handleChangeConditionDataConditionThemeType = (value, index) => {
    let { coupon } = this.state;
    if (coupon && coupon?.conditions) {
      let conditions = [...coupon?.conditions];
      conditions[index].condition_data.theme_type = value;
      this.setState({ coupon: { ...coupon, conditions } });
    }
  };
  handleChangeConditionApplyThemeId = (value, index) => {
    let { coupon } = this.state;
    if (coupon && coupon?.conditions && value.length > 10) {
      value = value.replace(" ", "     "); // chèn 5 dấu cách vào chỗ dấu cách đầu tiên
      value = value.slice(0, 5).trim(); // lấy 5 ký tự đầu rồi trim

      let conditions = [...coupon?.conditions];
      conditions[index].condition_data.theme_id = value;
      this.setState({ coupon: { ...coupon, conditions } });
    }
  };
  handleChangeCouponDiscountFor = (value) => {
    let { coupon } = this.state;
    if (coupon) {
      this.setState({
        coupon: {
          ...coupon,
          data: {
            ...coupon?.data,
            discount_for: value,
          },
        },
      });
    }
  };
  handleChangeCouponConditionType = (value) => {
    let { coupon } = this.state;
    if (coupon) {
      this.setState({
        coupon: {
          ...coupon,
          data: {
            ...coupon?.data,
            condition_type: value,
          },
        },
      });
    }
  };
  handleChangeCouponDiscountType = (value) => {
    let { coupon } = this.state;
    if (coupon) {
      this.setState({
        coupon: {
          ...coupon,
          data: {
            ...coupon?.data,
            discount_type: value,
          },
        },
      });
    }
  };
  handleChangeCouponDiscountValue = (value) => {
    let { coupon } = this.state;
    if (coupon) {
      this.setState({
        coupon: {
          ...coupon,
          data: {
            ...coupon?.data,
            value: value,
          },
        },
      });
    }
  };
  handleChangeCouponApplyThemeId = (value) => {
    let { coupon } = this.state;
    if (coupon && value.length > 10) {
      value = value.replace(" ", "     "); // chèn 5 dấu cách vào chỗ dấu cách đầu tiên
      value = value.slice(0, 5).trim(); // lấy 5 ký tự đầu rồi trim

      this.setState({
        coupon: {
          ...coupon,
          data: {
            ...coupon?.data,
            theme_id: value,
          },
        },
      });
    }
  };

  handleAddCondition = (index) => {
    let { coupon } = this.state;
    if (coupon && coupon?.conditions) {
      let conditions = [...coupon?.conditions];
      conditions.push({
        id: "",
        condition_apply: "cart",
        condition_data: {
          type_theme: "all",
          theme_id: "",
          value: 0,
          condition_type: "number",
          condition: ">",
        },
      });
      this.setState({ coupon: { ...coupon, conditions } });
    }
  };

  render() {
    let { coupon, tab, themes } = this.state;
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
              className={`tab-item ${tab === "condition" ? "active" : ""}`}
              onClick={() => this.setState({ tab: "condition" })}
            >
              Điều kiện
            </div>
            <div
              className={`tab-item ${tab === "result" ? "active" : ""}`}
              onClick={() => this.setState({ tab: "result" })}
            >
              Trả thưởng
            </div>
          </div>
          <div className="content">
            <div className={`content-item ${tab === "info" ? "active" : ""}`}>
              <div className="coupon-container">
                <div className="form-container w--label">
                  <label>Mã:</label>
                  <input
                    className="input"
                    placeholder="Vui lòng nhập mã giảm giá"
                    defaultValue={coupon.code}
                    onChange={(e) => {
                      this.setState({
                        coupon: {
                          ...coupon,
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
                    placeholder="Vui lòng nhập tên giảm giá"
                    defaultValue={coupon.name}
                    onChange={(e) => {
                      this.setState({
                        coupon: {
                          ...coupon,
                          name: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div className="form-container w--label">
                  <label>Mô tả điều kiện:</label>
                  <input
                    className="input"
                    placeholder="Vui lòng mô tả điều kiện áp dụng"
                    defaultValue={coupon.condition_info}
                    onChange={(e) => {
                      this.setState({
                        coupon: {
                          ...coupon,
                          condition_info: e.target.value,
                        },
                      });
                    }}
                  />
                </div>

                <div className="form-container w--label">
                  <label>Thời gian bắt đầu:</label>
                  <input
                    className="input"
                    type="datetime-local"
                    defaultValue={coupon.start_date}
                    onChange={(e) => {
                      this.setState({
                        coupon: {
                          ...coupon,
                          start_date: convertDateTime(e.target.value),
                        },
                      });
                    }}
                  />
                </div>
                <div className="form-container w--label">
                  <label>Thời gian kết thúc:</label>
                  <input
                    className="input"
                    type="datetime-local"
                    defaultValue={coupon.end_date}
                    onChange={(e) => {
                      this.setState({
                        coupon: {
                          ...coupon,
                          end_date: convertDateTime(e.target.value),
                        },
                      });
                    }}
                  />
                </div>
                <div className="form-container w--label">
                  <label>Trạng thái:</label>
                  <div className="radio-list">
                    <input
                      className="input"
                      type="radio"
                      name="status"
                      value={1}
                      checked={coupon.active === 1 || coupon.active === "1"}
                      onClick={(e) => {
                        this.setState({
                          coupon: {
                            ...coupon,
                            active: e.target.value,
                          },
                        });
                      }}
                    />{" "}
                    Hoạt động
                    <input
                      className="input"
                      type="radio"
                      name="status"
                      value={0}
                      checked={coupon.active === 0 || coupon.active === "0"}
                      onClick={(e) => {
                        this.setState({
                          coupon: {
                            ...coupon,
                            active: e.target.value,
                          },
                        });
                      }}
                    />{" "}
                    Không hoạt động
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`content-item ${tab === "condition" ? "active" : ""}`}
            >
              <div className="condition-container w--label">
                {coupon.conditions &&
                  coupon.conditions.length > 0 &&
                  coupon.conditions.map((item, index) => {
                    return (
                      <div className="condition-item w--label" key={item.id}>
                        <div className="form-container">
                          <label>Điều kiện:</label>
                          <select
                            onChange={(e) =>
                              this.handleChangeConditionApplyCondition(
                                e.target.value,
                                index
                              )
                            }
                          >
                            <option
                              value="cart"
                              selected={item.condition_apply === "cart"}
                            >
                              Giỏ hàng
                            </option>
                            <option
                              value="product"
                              selected={item.condition_apply === "product"}
                            >
                              Sản phẩm
                            </option>
                          </select>
                        </div>
                        {item.condition_apply === "cart" ? (
                          <div className="form-container w--label">
                            <select>
                              <option>Tổng giá trị đơn hàng</option>
                            </select>

                            <select
                              id="operator"
                              name="operator"
                              onChange={(e) =>
                                this.handleChangeConditionDataCondition(
                                  e.target.value,
                                  index
                                )
                              }
                            >
                              <option
                                value="<="
                                selected={
                                  item?.condition_data?.condition === "<="
                                }
                              >
                                &le;
                              </option>
                              <option
                                value="<"
                                selected={
                                  item?.condition_data?.condition === "<"
                                }
                              >
                                &lt;{" "}
                              </option>
                              <option
                                value="="
                                selected={
                                  item?.condition_data?.condition === "="
                                }
                              >
                                =
                              </option>
                              <option
                                value=">"
                                selected={
                                  item?.condition_data?.condition === ">"
                                }
                              >
                                &gt;
                              </option>
                              <option
                                value=">="
                                selected={
                                  item?.condition_data?.condition === ">="
                                }
                              >
                                &ge;
                              </option>
                            </select>
                            <input
                              className="input"
                              placeholder="Vui lòng nhập giá trị đơn hàng"
                              type="number"
                              defaultValue={item?.condition_data?.value ?? ""}
                              onChange={(e) =>
                                this.handleChangeConditionDataValue(
                                  e.target.value,
                                  index
                                )
                              }
                            />
                          </div>
                        ) : (
                          <div className="form-container w--label">
                            <select
                              onChange={(e) =>
                                this.handleChangeConditionDataConditionThemeType(
                                  e.target.value,
                                  index
                                )
                              }
                            >
                              <option
                                value="all"
                                selected={
                                  item?.condition_data?.condition_type === "all"
                                }
                              >
                                Tất cả sản phẩm
                              </option>
                              <option
                                value="some"
                                selected={
                                  item?.condition_data?.condition_type ===
                                  "some"
                                }
                              >
                                Một sản phẩm
                              </option>
                            </select>
                            {item?.condition_data?.theme_type === "some" && (
                              <>
                                <input
                                  list="list_products"
                                  className="input"
                                  placeholder="Vui lòng nhập giá trị"
                                  type="text"
                                  onChange={(e) =>
                                    this.handleChangeConditionApplyThemeId(
                                      e.target.value,
                                      index
                                    )
                                  }
                                />
                                <datalist id="list_products">
                                  {themes &&
                                    themes.length > 0 &&
                                    themes.map((theme, index) => (
                                      <option
                                        key={index}
                                        value={`${theme.id} [${theme.code}] ${theme.title}`}
                                      />
                                    ))}
                                </datalist>
                              </>
                            )}

                            <select
                              id="operator"
                              name="operator"
                              onChange={(e) =>
                                this.handleChangeConditionDataConditionType(
                                  e.target.value,
                                  index
                                )
                              }
                            >
                              <option
                                value="number"
                                selected={
                                  item?.condition_data?.condition_type ===
                                  "number"
                                }
                              >
                                Số lượng sản phẩm
                              </option>
                              <option
                                value="price"
                                selected={
                                  item?.condition_data?.condition_type ===
                                  "price"
                                }
                              >
                                Giá trị sản phẩm
                              </option>
                            </select>
                            <select
                              id="operator"
                              name="operator"
                              onChange={(e) =>
                                this.handleChangeConditionDataCondition(
                                  e.target.value,
                                  index
                                )
                              }
                            >
                              <option
                                value="<="
                                selected={
                                  item?.condition_data?.condition === "<="
                                }
                              >
                                &le;
                              </option>
                              <option
                                value="<"
                                selected={
                                  item?.condition_data?.condition === "<"
                                }
                              >
                                &lt;{" "}
                              </option>
                              <option
                                value="="
                                selected={
                                  item?.condition_data?.condition === "="
                                }
                              >
                                =
                              </option>
                              <option
                                value=">"
                                selected={
                                  item?.condition_data?.condition === ">"
                                }
                              >
                                &gt;
                              </option>
                              <option
                                value=">="
                                selected={
                                  item?.condition_data?.condition === ">="
                                }
                              >
                                &ge;
                              </option>
                            </select>
                            <input
                              className="input"
                              placeholder="Vui lòng nhập giá trị"
                              type="number"
                              defaultValue={item?.condition_data?.value ?? ""}
                              onChange={(e) =>
                                this.handleChangeConditionDataValue(
                                  e.target.value,
                                  index
                                )
                              }
                            />
                          </div>
                        )}

                        <div className="btn-container">
                          <button
                            className={`btn btn-bg-violet-op-5 ${
                              index < coupon.conditions?.length - 1 &&
                              "none-visabled"
                            }`}
                            onClick={() => this.handleAddCondition(index)}
                          >
                            Thêm điều kiện
                          </button>
                        </div>
                      </div>
                    );
                  })}

                <div className="btn-container">
                  <div className="form-container w--label">
                    <label>Áp dụng điều kiện: </label>
                    <select
                      onClick={(e) => {
                        this.setState({
                          coupon: {
                            ...coupon,
                            condition_apply: e.target.value,
                          },
                        });
                      }}
                    >
                      <option
                        value="ALL"
                        selected={coupon.condition_apply === "ALL"}
                      >
                        Tất cả điều kiện
                      </option>
                      <option
                        value="SOME"
                        selected={coupon.condition_apply === "SOME"}
                      >
                        Một vài điều kiện
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className={`content-item ${tab === "result" ? "active" : ""}`}>
              <div className="discount-container">
                <div className="form-container w--label">
                  <label>Giảm giá:</label>
                  <select
                    onChange={(e) =>
                      this.handleChangeCouponDiscountFor(e.target.value)
                    }
                  >
                    <option
                      value="cart"
                      selected={coupon?.data?.discount_for === "cart"}
                    >
                      Giỏ hàng
                    </option>
                    <option
                      value="theme"
                      selected={coupon?.data?.discount_for === "theme"}
                    >
                      Theme
                    </option>
                  </select>
                  {coupon?.data?.discount_for === "theme" && (
                    <>
                      <select
                        id="operator"
                        name="operator"
                        onChange={(e) =>
                          this.handleChangeCouponConditionType(e.target.value)
                        }
                      >
                        <option
                          value="all"
                          selected={coupon?.data?.condition_type === "all"}
                        >
                          Tất cả sản phẩm
                        </option>
                        <option
                          value="only_theme"
                          selected={
                            coupon?.data?.condition_type === "only_theme"
                          }
                        >
                          Duy nhất 1 theme
                        </option>
                      </select>
                      <input
                        list="list_products-gift"
                        className="input"
                        placeholder="Vui lòng nhập giá trị"
                        type="text"
                        onChange={(e) =>
                          this.handleChangeCouponApplyThemeId(e.target.value)
                        }
                      />
                      <datalist id="list_products-gift">
                        {themes &&
                          themes.length > 0 &&
                          themes.map((theme, index) => (
                            <option
                              key={index}
                              value={`${theme.id} [${theme.code}] ${theme.title}`}
                            />
                          ))}
                      </datalist>
                    </>
                  )}
                </div>
                <div className="form-container w--label">
                  <label>Loại giảm giá: </label>
                  <select
                    id="operator"
                    name="operator"
                    onChange={(e) =>
                      this.handleChangeCouponDiscountType(e.target.value)
                    }
                  >
                    <option
                      value="price"
                      selected={coupon?.data?.discount_type === "price"}
                    >
                      Tiền
                    </option>
                    <option
                      value="percent"
                      selected={coupon?.data?.discount_type === "percent"}
                    >
                      Phần trăm
                    </option>
                  </select>
                </div>
                {coupon?.data?.discount_type === "percent" && (
                  <div className="form-container w--label">
                    <label>Giới hạn giảm giá: </label>
                    <input
                      className="input"
                      placeholder="Vui lòng nhập số tiền giới hạn"
                      type="text"
                      value={convertTextToMoneyInput(coupon.data?.limit) ?? ""}
                      onChange={(e) =>
                        this.setState({
                          coupon: {
                            ...coupon,
                            data: {
                              ...coupon.data,
                              limit: convertMoneyInputToText(e.target.value),
                            },
                          },
                        })
                      }
                    />
                  </div>
                )}
                <div className="form-container w--label">
                  <input
                    className="input"
                    placeholder="Vui lòng nhập giá trị"
                    type="text"
                    value={convertTextToMoneyInput(coupon.data.value) ?? ""}
                    onChange={(e) =>
                      this.handleChangeCouponDiscountValue(
                        convertMoneyInputToText(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="form-btn">
              <button
                className="btn btn-bg-orange-op-5"
                onClick={() => this.handleSaveCoupon()}
              >
                Lưu
              </button>
              <button
                className="btn btn-bg-red-op-5"
                onClick={() => this.handleDeleteCoupon(coupon.code)}
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
