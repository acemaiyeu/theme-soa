import React from "react";
import "./Footer.scss";
import { withRouter } from "react-router-dom";
import "./InfoWarranty.scss";
class InfoWarranty extends React.Component {
  render() {
    return (
      <>
        <div className="warranty-container">
          <h3 className="warranty-title"> Chính sách bảo hành</h3>
          <ul className="info-list">
            Chính sách bảo hành khi mua tại website
            <li>
              ThemeForStudents cung cấp file hưỡng dẫn cài đặt (README) để khách
              hàng cài đặt dễ dàng.{" "}
            </li>
            <li>ThemeForStudents cung cấp mã nguồn không chứa mã độc</li>
            <li>
              Đối với các theme có dữ liệu sẵn thì khách hàng chỉ cần gọi api để
              lấy dữ liệu giống với dữ liệu mẫu có sẵn
            </li>
            <li>Chúng tôi chỉ cung cấp đúng theo video demo</li>
            <li>
              Chúng tôi chịu trách nhiệm nếu website bị hack hoặc bị tấn công mã
              độc từ nguồn khác
            </li>
            <li>
              Sau 48 giờ, chúng tôi sẽ hủy đường dẫn truy cập tải về project đó
            </li>
            <li>
              Mọi vấn đề khác vui lòng truy cập trang{" "}
              <a href="">Câu hỏi thường gặp</a> để giải quyết vấn đề
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default withRouter(InfoWarranty);
