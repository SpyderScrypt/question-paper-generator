import React, { Component } from "react";
import KnowledgeBankNavigation from "../KnowledgeBankNavigation/KnowledgeBankNavigation";
import EditUnit from "../EditUnit/EditUnit";

export default class EditUintContainer extends Component {
  componentDidMount() {
    document.getElementById("editUnitLink").style.color = "#2BBBAD";
  }
  componentWillUnmount() {
    document.getElementById("editUnitLink").style.color = "#ffff";
  }
  render() {
    return (
      <div>
        <KnowledgeBankNavigation />
        <EditUnit />
      </div>
    );
  }
}
