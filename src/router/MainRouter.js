import React, { Component } from "react";
import { HashRouter, Route, Link, BrowserRouter } from "react-router-dom";
import EgComponent from "../components/EgComponent";
import MainNavbar from "../components/MainNavbar/MainNavbar";

export default class MainRouter extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          {/* <EgComponent /> */}
          <MainNavbar/>
        </div>
      </HashRouter>
    );
  }
}
