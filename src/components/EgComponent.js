import React, { Component } from "react";
import { sendData } from "../actions/sendData";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";

class EgComponent extends Component {
  dataHandler = () => {
    this.props.sendData("Akash");
  };

  render() {
    return (
      <div>
        <div className="App">
          <p>asdasd</p>
          <button onClick={this.dataHandler}>Send</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendData: sendData
    },
    dispatch
  );
export default connect(
  null,
  mapDispatchToProps
)(EgComponent);
