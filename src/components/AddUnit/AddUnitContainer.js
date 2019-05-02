import React, { Component } from "react";
import UnitInput from "../UnitInput/UnitInput";
import KnowledgeBankNavigation from "../KnowledgeBankNavigation/KnowledgeBankNavigation";

export default class AddUnitContainer extends Component {
  componentDidMount() {
    document.getElementById("addUnitLink").style.color = "#2BBBAD";
  }
  componentWillUnmount() {
    document.getElementById("addUnitLink").style.color = "#ffff";
  }
  render() {
    return (
      <div>
        <KnowledgeBankNavigation />
        <UnitInput />
      </div>
    );
  }
}
