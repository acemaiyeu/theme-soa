import React from "react";
import "./App.css";
import Home from "./Client/Home";
import Detail from "./Client/Detail";
import Nav from "./Client/Nav";
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Cart from "./Client/Cart";
import NavAdmin from "./Admin/NavAdmin";
import AdminHome from "./Admin/AdminHome";
import Theme from "./Admin/Theme";
import ControlHeader from "./Admin/ControlHeader";
import LoginAdmin from "./Admin/LoginAdmin";
import RequireAuth from "./Admin/RequireAuth";
import ManagerOrders from "./Admin/ManagerOrders";
import { ToastContainer } from "react-toastify";
class App extends React.Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };
  render() {
    return (
      <Router>
        <AppContent time={this.state.time} />
      </Router>
    );
  }
}

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
                      <Route path="/admin/discounts" exact component={Theme} />
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </Switch>
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

export default App;
