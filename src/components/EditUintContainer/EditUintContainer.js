import React, { Component } from "react";
import KnowledgeBankNavigation from "../KnowledgeBankNavigation/KnowledgeBankNavigation";
import EditUnit from "../EditUnit/EditUnit";

export default class EditUintContainer extends Component {
  render() {
    return (
      <div>
        <KnowledgeBankNavigation />
        <EditUnit />
      </div>
    );
  }
}
