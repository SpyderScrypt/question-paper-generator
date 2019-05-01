import React, { Component } from "react";
import { HashRouter, Route, Link, BrowserRouter } from "react-router-dom";
import MainNavbar from "../components/MainNavbar/MainNavbar";
import KnowledgeBankNavigation from "../components/KnowledgeBankNavigation/KnowledgeBankNavigation";
import Instructions from "../components/Instructions/Instructions";
import GeneratePaper from "../components/GeneratePaper/GeneratePaper";
import AddUnitContainer from "../components/AddUnit/AddUnitContainer";
import QuestionPaper from "../components/QuestionPaper/QuestionPaper";
import AddQuestionsContainer from "../components/AddQuestionsContainer/AddQuestionsContainer";
import EditUintContainer from "../components/EditUintContainer/EditUintContainer";

export default class MainRouter extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          {/* <EgComponent /> */}
          <MainNavbar />
          {/* <Route path="/" exact component={MainNavbar} /> */}
          <Route path="/instructions" exact component={Instructions} />
          <Route path="/knowledgebase" exact component={KnowledgeBankNavigation} />
          <Route path="/addUnit" exact component={AddUnitContainer} />
          <Route path="/generatepaper" exact component={GeneratePaper} />
          <Route path="/questionPaper" exact component={QuestionPaper} />
          <Route path="/addQuestion" exact component={AddQuestionsContainer} />
          <Route path="/editUnit" exact component={EditUintContainer} />

        </div>
      </HashRouter>
    );
  }
}
