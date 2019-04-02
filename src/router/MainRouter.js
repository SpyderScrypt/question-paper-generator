import React, { Component } from "react";
import { HashRouter, Route, Link, BrowserRouter } from "react-router-dom";
import EgComponent from "../components/EgComponent";
import MainNavbar from "../components/MainNavbar/MainNavbar";
import KnowledgeBase from "../components/KnowledgeBase/KnowledgeBase";
import Instructions from "../components/Instructions/Instructions";

export default class MainRouter extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          {/* <EgComponent /> */}
          <MainNavbar />
          <Route path="/" exact component={Instructions} />
          <Route path="/knowledgebase" exact component={KnowledgeBase} />
        </div>
      </HashRouter>
    );
  }
}
