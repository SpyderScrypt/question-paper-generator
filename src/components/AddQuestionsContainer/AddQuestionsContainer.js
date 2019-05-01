import React, { Component } from "react";
import KnowledgeBankNavigation from "../KnowledgeBankNavigation/KnowledgeBankNavigation";
import AddQuestion from "../AddQuestion/AddQuestion";

export default class AddUnitContainer extends Component {
  render() {
    return (
      <div>
        <KnowledgeBankNavigation />
        <AddQuestion/>
      </div>
    );
  }
}
