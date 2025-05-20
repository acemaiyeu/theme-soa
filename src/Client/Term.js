import React from "react";
import "./Footer.scss";
import { withRouter } from "react-router-dom";
import "./InfoWarranty.scss";
class Term extends React.Component {
  render() {
    return (
      <>
        <div className="warranty-container">
          <h3 className="warranty-title"> Điều khoản sử dụng</h3>
          <ul className="info-list">
            <h3>1. ĐỐI TƯỢNG ÁP DỤNG</h3>
            <li>
              Website này được xây dựng để cung cấp giao diện (theme) cho sinh
              viên sử dụng trong các dự án học tập, bài tập, đồ án hoặc mục đích
              cá nhân. Tuyệt đối không sử dụng cho mục đích thương mại nếu chưa
              được sự cho phép từ chúng tôi.
            </li>
          </ul>
          <ul className="info-list">
            <h3>2. QUYỀN VÀ TRÁCH NHIỆM CỦA NGƯỜI DÙNG</h3>
            <li>Cung cấp thông tin chính xác khi đăng ký tài khoản (nếu có)</li>
            <li>Chỉ sử dụng theme đã mua đúng với mục đích học tập/cá nhân</li>
            <li>
              Không chia sẻ, bán lại, hoặc phát tán theme dưới bất kỳ hình thức
              nào.
            </li>
            <li>Cung cấp thông tin chính xác khi đăng ký tài khoản (nếu có)</li>
          </ul>
          <ul className="info-list">
            <h3>3. BẢN QUYỀN</h3>
            <li>
              Tất cả theme trên website là sản phẩm sở hữu trí tuệ của [Tên
              Website] hoặc đối tác. Người mua được cấp quyền sử dụng, không sở
              hữu bản quyền hoàn toàn. Việc sao chép hoặc phân phối trái phép là
              vi phạm pháp luật.
            </li>
          </ul>
          <ul className="info-list">
            <h3>4. THAY ĐỔI ĐIỀU KHOẢN</h3>
            <li>
              Chúng tôi có quyền thay đổi điều khoản sử dụng bất cứ lúc nào. Mọi
              thay đổi sẽ được thông báo trên website. Việc tiếp tục sử dụng sau
              khi điều khoản thay đổi đồng nghĩa với việc bạn đồng ý với nội
              dung cập nhật.
            </li>
          </ul>
          <ul className="info-list">
            <h3>5. LIÊN HỆ</h3>
            <li>
              Mọi thắc mắc hoặc yêu cầu hỗ trợ, vui lòng liên hệ qua: <br />{" "}
              Email: themeforstudents@gmail.com <br />
              Facebook: https://www.facebook.com/themeforstudents/
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default withRouter(Term);
