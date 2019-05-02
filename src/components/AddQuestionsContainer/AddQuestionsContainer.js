import React, { Component } from "react";
import KnowledgeBankNavigation from "../KnowledgeBankNavigation/KnowledgeBankNavigation";
import AddQuestion from "../AddQuestion/AddQuestion";

export default class AddUnitContainer extends Component {
  componentDidMount() {
    document.getElementById("addQuestionLink").style.color = "#2BBBAD";
  }
  componentWillUnmount() {
    document.getElementById("addQuestionLink").style.color = "#ffff";
  }
  render() {
    return (
      <div>
        <KnowledgeBankNavigation />
        <AddQuestion />
      </div>
    );
  }
}
