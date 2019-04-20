import React, { Component } from "react";
import UnitInput from "../UnitInput/UnitInput";
import KnowledgeBankNavigation from "../KnowledgeBankNavigation/KnowledgeBankNavigation";

export default class AddUnitContainer extends Component {
  render() {
    return (
      <div>
        <KnowledgeBankNavigation />
        <UnitInput/>
      </div>
    );
  }
}
