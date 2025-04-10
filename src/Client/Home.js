import React from "react";
import "./Home.scss";

import Contents from "./Contents";
import Nav from "./Nav";
class Home extends React.Component {
  state = {
    listThemes: [
      {
        id: 1,
        img: "../../src/assets/images/logo.png",
        title: "Theme Laravel điện máy, gia dụng nồi chiên không dầu",
        price: 700000,
        price_old: 1000000,
        framework: "Laravel",
        dependencies: "Bootstrap",
        descriptions: "Theme Laravel thời trang",
      },
      {
        id: 2,
        img: "../../src/assets/images/logo.png",
        title: "Theme Laravel công ty tư vấn luật số 2",
        price: 900000,
        price_old: 1000000,
        framework: "Laravel",
        dependencies: "Bootstrap",
        descriptions: "Theme Laravel thời trang",
      },
      {
        id: 2,
        img: "../../src/assets/images/logo.png",
        title: "Theme Laravel công ty tư vấn luật số 2",
        price: 900000,
        price_old: 1000000,
        framework: "Laravel",
        dependencies: "Bootstrap",
        descriptions: "Theme Laravel thời trang",
      },
      {
        id: 2,
        img: "../../src/assets/images/logo.png",
        title: "Theme Laravel công ty tư vấn luật số 2",
        price: 900000,
        price_old: 1000000,
        framework: "Laravel",
        dependencies: "Bootstrap",
        descriptions: "Theme Laravel thời trang",
      },
      {
        id: 2,
        img: "../../src/assets/images/logo.png",
        title: "Theme Laravel công ty tư vấn luật số 2",
        price: 900000,
        price_old: 1000000,
        framework: "Laravel",
        dependencies: "Bootstrap",
        descriptions: "Theme Laravel thời trang",
      },
      {
        id: 2,
        img: "../../src/assets/images/logo.png",
        title: "Theme Laravel công ty tư vấn luật số 2",
        price: 900000,
        price_old: 1000000,
        framework: "Laravel",
        dependencies: "Bootstrap",
        descriptions: "Theme Laravel thời trang",
      },
      {
        id: 2,
        img: "../../src/assets/images/logo.png",
        title: "Theme Laravel công ty tư vấn luật số 2",
        price: 900000,
        price_old: 1000000,
        framework: "Laravel",
        dependencies: "Bootstrap",
        descriptions: "Theme Laravel thời trang",
      },
      {
        id: 2,
        img: "../../src/assets/images/logo.png",
        title: "Theme Laravel công ty tư vấn luật số 2",
        price: 900000,
        price_old: 1000000,
        framework: "Laravel",
        dependencies: "Bootstrap",
        descriptions: "Theme Laravel thời trang",
      },
      {
        id: 2,
        img: "../../src/assets/images/logo.png",
        title: "Theme Laravel công ty tư vấn luật số 2",
        price: 900000,
        price_old: 1000000,
        framework: "Laravel",
        dependencies: "Bootstrap",
        descriptions: "Theme Laravel thời trang",
      },
    ],
  };
  render() {
    let { listThemes } = this.state;
    return (
      <>
        <Nav />
        <Contents listThemes={listThemes} />
      </>
    );
  }
}

export default Home;
