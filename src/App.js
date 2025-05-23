import React from "react";
import "./App.css";
import Home from "./Client/Home";
import Detail from "./Client/Detail";
import Nav from "./Client/Nav";
import { Switch, Route, useLocation } from "react-router-dom";
import Cart from "./Client/Cart";
import NavAdmin from "./Admin/NavAdmin";
import AdminHome from "./Admin/AdminHome";
import Theme from "./Admin/Theme";
import ControlHeader from "./Admin/ControlHeader";
import LoginAdmin from "./Admin/LoginAdmin";
import RequireAuth from "./Admin/RequireAuth";
import ManagerOrders from "./Admin/ManagerOrders";
import { ToastContainer } from "react-toastify";
import LoginAndRegister from "./Client/LoginAndRegister";
import Profile from "./Client/Profile";
import MyOrders from "./Client/MyOrders";
import DetailOrder from "./Client/DetailOrder";
import { connect } from "react-redux";
import { fetchCartAndProfile } from "./store/actions/fetchCartAndProfile";
import forGetPassword from "./Client/forGetPassword";
import ListCoupon from "./Admin/ListCoupon";
import CreateCoupon from "./Admin/CreateCoupon";
import Footer from "./Client/Footer";
import InfoWarranty from "./Client/InfoWarranty";
import InfoRefund from "./Client/InfoRefund";
import Term from "./Client/Term";
import SecurityInfomation from "./Client/SecurityInfomation";
import Introduce from "./Client/Introduce";
import ListCategory from "./Admin/ListCategory";
import CreateCategory from "./Admin/CreateCategory";
import ListGift from "./Admin/ListGift";
import CreateGift from "./Admin/CreateGift";

class App extends React.Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };
  componentDidMount() {
    this.props.fetchCartAndProfile();
  }
  render() {
    return <AppContent time={this.state.time} />;
  }
}
const mapStateToProps = (state) => ({
  cart: state.cart,
  profile: state.profile,
});
const mapDispatchToProps = {
  fetchCartAndProfile,
};

function AppContent() {
  const location = useLocation(); // ✅ OK vì đang trong BrowserRouter rồi
  let isAdminRoute = location.pathname.startsWith("/admin");
  let isAdminLoginRoute = location.pathname.startsWith("/admin/login");
  return (
    <div className="App">
      <header className="App-header">
        {isAdminRoute ? <>{/* <NavAdmin /> */}</> : <Nav />}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detail/:path" exact component={Detail} />
          <Route path="/cart" component={Cart} />
          <Route path="/info-warranty" component={InfoWarranty} />
          <Route path="/info-refund" component={InfoRefund} />
          <Route path="/info-terms" component={Term} />
          <Route
            path="/info-security-infomation"
            component={SecurityInfomation}
          />
          <Route path="/introduce" component={Introduce} />
          <Route path="/profile" component={Profile} />
          <Route path="/my-orders" exact component={MyOrders} />
          <Route path="/my-order/:code" component={DetailOrder} />
          <Route path="/login" exact component={LoginAndRegister} />
          <Route path="/forgot" exact component={forGetPassword} />

          {isAdminRoute ? (
            <>
              <Route path="/admin/login" exact component={LoginAdmin} />
              {!isAdminLoginRoute && (
                <div className="container-admin">
                  <NavAdmin />
                  <RequireAuth />
                  <div className="content-admin">
                    <div className="container-content-admin">
                      <ControlHeader />
                      <Route path="/admin" exact component={AdminHome} />

                      <Route path="/admin/theme" exact component={Theme} />
                      <Route
                        path="/admin/orders"
                        exact
                        component={ManagerOrders}
                      />
                      <Route
                        path="/admin/order/detail/:id"
                        exact
                        component={Theme}
                      />
                      <Route
                        path="/admin/coupons"
                        exact
                        component={ListCoupon}
                      />
                      <Route
                        path="/admin/create-coupon"
                        exact
                        component={CreateCoupon}
                      />
                      <Route
                        path="/admin/coupon/:code"
                        exact
                        component={CreateCoupon}
                      />
                      <Route
                        path="/admin/category"
                        exact
                        component={ListCategory}
                      />
                      <Route
                        path="/admin/category/create"
                        exact
                        component={CreateCategory}
                      />
                      <Route
                        path="/admin/category/create/:code"
                        exact
                        component={CreateCategory}
                      />

                      <Route path="/admin/gifts" exact component={ListGift} />
                      <Route
                        path="/admin/gift/create"
                        exact
                        component={CreateGift}
                      />
                      <Route
                        path="/admin/gift/create/:id"
                        exact
                        component={CreateGift}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </Switch>
        {!isAdminRoute && <Footer />}
      </header>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
