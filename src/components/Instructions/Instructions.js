import React, { Component } from "react";

export default class Instructions extends Component {
  componentDidMount() {
    document.getElementById("instructionsLink").style.color = "#2BBBAD";
  }
  componentWillUnmount(){
    document.getElementById("instructionsLink").style.color = "#ffff";

  }
  render() {
    return (
      <div>
        Instructions
      </div>
    );
  }
}
