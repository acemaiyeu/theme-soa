import React from "react";
import "./Footer.scss";
import { withRouter } from "react-router-dom";
import "./InfoWarranty.scss";
class InfoRefund extends React.Component {
  render() {
    return (
      <>
        <div className="warranty-container">
          <h3 className="warranty-title">
            {" "}
            Giới thiệu trang web ThemForStudents
          </h3>
          <ul className="info-list">
            <li>
              Trang web được tạo ra để giúp học sinh, sinh viên có thể kết hợp
              với các dự án của mình.
            </li>
            <li>
              Chẳng hạn như: Bạn đã làm web tĩnh, bạn có thể lựa chọn gói api
              bên chúng tôi để khiến website mình động hơn. Tạo điểm nhấn cho
              các thầy cô
            </li>
            <li>
              Thay vì chỉ cung cấp cho các bạn 1 trang duy nhất thì chúng tôi
              cung cấp cho bạn full luồng đặt hàng người dùng, thô hoặc có dữ
              liệu động.
            </li>
            <li>
              Kết hợp với các thư viện kèm theo như: Laravel chúng tôi sử dụng
              thư viện Validation, Transformer, JWT,... React chúng tôi sử dụng
              thư viện Redux, React Router, Toast,...
            </li>
            <li>
              Đối với Cơ sở dữ liệu (database) chúng tôi cung cấp file sql để
              tạo và insert dữ liệu có sẵn. Đồng thời kèm theo 1 file ERD, 1
              file mô tả các trường cũng như mối quan hệ giữa các bảng.
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default withRouter(InfoRefund);
