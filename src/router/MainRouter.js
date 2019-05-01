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
import PdfPage from "../components/PdfPage/PdfPage";

export default class MainRouter extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          {/* <EgComponent /> */}
          <MainNavbar />
          <Route path="/instructions"  component={Instructions} />
          <Route path="/knowledgebase"  component={KnowledgeBankNavigation} />
          <Route path="/addUnit"  component={AddUnitContainer} />
          <Route path="/generatepaper"  component={GeneratePaper} />
          <Route path="/questionPaper"  component={QuestionPaper} />
          <Route path="/addQuestion"  component={AddQuestionsContainer} />
          <Route path="/editUnit" component={EditUintContainer} />
          <Route path="/pdfPage" component={PdfPage} />

        </div>
      </HashRouter>
    );
  }
}
