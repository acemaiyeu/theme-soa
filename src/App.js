import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Home from "./Client/Home";
import Detail from "./Client/Detail";
import Nav from "./Client/Nav";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import Cart from "./Client/Cart";
import NavAdmin from "./Admin/NavAdmin";
import AdminHome from "./Admin/AdminHome";
import Theme from "./Admin/Theme";
import ControlHeader from "./Admin/ControlHeader";
class App extends React.Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };
  render() {
    return (
      <BrowserRouter>
        <AppContent time={this.state.time} />
      </BrowserRouter>
    );
  }
}

function AppContent() {
  const location = useLocation(); // ✅ OK vì đang trong BrowserRouter rồi
  let isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <div className="App">
      <header className="App-header">
        {isAdminRoute ? <>{/* <NavAdmin /> */}</> : <Nav />}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detail/:path" component={Detail} />
          <Route path="/cart" component={Cart} />
          {isAdminRoute ? (
            <>
              <div className="container-admin">
                <NavAdmin />
                <div className="content-admin">
                  <div className="container-content-admin">
                    <ControlHeader />
                    <Route path="/admin" exact component={AdminHome} />
                    <Route path="/admin/theme" exact component={Theme} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </Switch>
      </header>
    </div>
  );
}
export default App;
